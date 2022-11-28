/**
 * Slackr Frontend Implementation - Slack replica
 * Written by Christopher Luong (z5309196) October 2022
 * Adapted from Hayden Smith's Week 5 live demo code
 */

import { BACKEND_PORT } from './config.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl } from './helpers.js';

const modal = new bootstrap.Modal('#errorModal');
const modalElement = modal._element;

let token = null;
let userId = null;
let currView = '';
const defaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAA90lEQVR4Ae3UJ4PDMAyG4fv1HxMTK6tRWYJ6zCxMLCxFFxQzsbDubVexb68X68m0/TQW9mngH2izYICdhDzgCcfYZ4BhjqtmYQoMjJtYJ0CFu5wNBFGdCTgGzgIvSNQZoEmBxgB1CtRfCnwKeAOsSr+SEqJ4jIH5TN4EytEN1ARjT7iJ+qn90FI0b4MxMM7NQ9aeFncc77JPDV210us3OZdUlgtm7KOZW7bBAtrMEeUkPABDRUhXhQRQT3icj0DPMONwC4QwEck1EGQkF9Aiq+4EBs4DFI6gQmbuAFbIrtsDlw/cDgwoSLdASoBswXMJWG5BXQLqcQOKfxhbw9MxtAAAAABJRU5ErkJggg==';
let paginationCount = 0;
let messageIndex = 0;
const numMessagesShown = 25;

const makeRequest = (route, method, body) => {
    const fetchOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    };
    // Only add body if it is given (GET method cannot have body)
    if (body !== undefined) {
        fetchOptions.body = JSON.stringify(body)
    }
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5005' + route, fetchOptions).then((rawResponse) => {
            return rawResponse.json();
        }).then((data) => {
            if (data.error) {
                showModal(createErrorModalBody(data.error));
            } else {
                resolve(data);
            }
        });
    });
};

/**
 * 2.1.3. Error popup: Created from cloning a template and calling in makeRequest()
 */
const cloneTemplate = (id) => {
    const template = document.getElementById(id);
    const clonedTemplate = template.content.cloneNode(true);
    return clonedTemplate;
};

const createErrorModalBody = (message) => {
    const template = cloneTemplate('error-modal-body');
    template.querySelector('.error-text').textContent = message;
    return template;
};

const showModal = (errorMessage) => {
    const modalBody = modalElement.querySelector('.modal-body');
    const modalTitle = document.getElementsByClassName('modal-title fs-5')[0]

    modalTitle.innerText = 'Oops, looks like we have an issue 🙁';

    modalBody.innerText = '';
    modalBody.append(errorMessage);

    modal.show();
};

const toggleElementVisibility = (show, hide) => {
    document.getElementById(hide).classList.add('hide');
    document.getElementById(show).classList.remove('hide');
    currView = show;
};

const isValidDetails = (emailAddress, name, password, passwordConfirm) => {
    let regex=/^(.+)@(.+)$/;

    if (!emailAddress || !password || !name || !passwordConfirm) {
        showModal(createErrorModalBody("Please fill in all fields"));
        return false;
    } else if (password !== passwordConfirm) {
        showModal(createErrorModalBody("Passwords do not match"));
        return false;
    } else if (!emailAddress.match(regex)) {
        showModal(createErrorModalBody(
            "Please enter a valid email e.g. john@gmail.com"));
        return false;
    }
    return true;
};

const clearForm = (isLoginForm) => {
    if (isLoginForm) {
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
    } else {        
        document.getElementById('register-email').value = '';
        document.getElementById('register-name').value = '';
        document.getElementById('register-password').value = '';
        document.getElementById('confirm-password').value = '';
    }
};

const getChannelId = () => {
    const channelIdBadge = document.getElementById('channel-id').innerText.split(' ');
    const channelId = channelIdBadge[channelIdBadge.length - 1];
    return channelId;
};

/**
 * 2.1.1. Login
 */
const loginForm = document.getElementById('login-form');
// Using FormData, a different method of getting input from form shown by tutor
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        showModal(createErrorModalBody("Please fill in all fields"));
        return;
    }

    makeRequest('/auth/login', 'POST', {
        email: email,
        password: password,
    }).then((data) => {
        token = data.token;
        userId = data.userId;
        toggleElementVisibility('logged-in', 'logged-out')
        document.getElementById('logout').style.display = 'inline-block';
        document.getElementById('channels-link').style.display = 'inline-block';
        document.getElementById('account-dropdown').style.display = 'inline-block';
        displayChannels();
    });
});

/**
 * 2.1.2. User Registration
 */
document.getElementById('register-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const name = document.getElementById('register-name').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('confirm-password').value;
    
    if (!isValidDetails(email, name, password, passwordConfirm)) {
        return;
    }
    
    makeRequest('/auth/register', 'POST', {
        email: email,
        name: name,
        password: password,
    }).then((data) => {
        token = data.token;
        userId = data.userId;
        toggleElementVisibility('logged-in', 'logged-out')
        document.getElementById('logout').style.display = 'inline-block';
        document.getElementById('channels-link').style.display = 'inline-block';
        document.getElementById('account-dropdown').style.display = 'inline-block';
        displayChannels();
    });
});

document.getElementById('register-link').addEventListener('click', () => {
    toggleElementVisibility('register-form', 'login-form');
});
document.getElementById('login-link').addEventListener('click', () => {
    toggleElementVisibility('login-form', 'register-form');
});

/**
 * 2.2.1. View list of channels
 */

/**
 * Nav button to view list of channels
 */
document.getElementById('channels-link').addEventListener('click', () => {
    displayChannels();
    toggleElementVisibility('channels-div', currView);
});

/**
 * Fetch all channels then make a list, with each list item linking to a channel
 */

const displayChannels = () => {
    makeRequest('/channel', 'GET').then((data) => {
        // Make a copy of the list item then empty both lists and list item
        const listItem = document.querySelectorAll(
            '.list-group-item.d-flex.justify-content-between.align-items-center')[0];
        listItem.innerText = ''
        document.getElementById('user-channels-list').innerText = '';
        document.getElementById('public-channels-list').innerText = '';
        
        renderChannelsList(listItem, data.channels);
    });
};

const renderChannelsList = (listItem, channels) => {
    currView = "channels-div";    
    for (const channel of channels) {
        const members = channel.members;
        const isMember = members.includes(userId);
        const isPrivate = channel.private;
        
        if (!isMember) { // Don't show private channels user is not part of
            if (isPrivate) {
                continue;
            }
        }
        const channelId = channel.id;
        const clone = listItem.cloneNode(true);
        const name = document.createElement('span');
        const idBadge = document.createElement('span');
        const statusBadge = document.createElement('span');

        clone.classList.add('channel-list-item'); // hover effect
        name.classList.add('me-auto');
        name.innerText = channel.name;
        clone.appendChild(name);
        idBadge.classList.add('badge', 'bg-dark', 'rounded-pill');
        idBadge.innerText = 'ID: ' + channelId;
        clone.appendChild(idBadge);
        
        if (!isPrivate) {
            statusBadge.classList.add('badge', 'bg-primary', 'rounded-pill');
            statusBadge.innerText = 'Public';
        } else {
            statusBadge.classList.add('badge', 'bg-secondary', 'rounded-pill');
            statusBadge.innerText = 'Private';
        }
        clone.appendChild(statusBadge);

        clone.addEventListener('click', () => {
            if (isMember) { // show channel details
                showChannelDetails(channelId, channel.name, isPrivate, channel.creator, isMember);
                toggleElementVisibility('leave-channel-btn', 'join-channel-btn');
                document.getElementById('edit-channel-btn').classList.remove('hide');
                document.getElementById('paginate-left').classList.add('hide');
                document.getElementById('messages-div').classList.remove('hide');
                messageIndex = 0;
                displayMessages(channelId, messageIndex);
            } else if (!isPrivate) { // show channel name and join button only
                showChannelDetails(channelId, channel.name, isPrivate, channel.creator, isMember);
                toggleElementVisibility('join-channel-btn', 'leave-channel-btn');
                document.getElementById('edit-channel-btn').classList.add('hide');
                document.getElementById('channel-messages').innerText = '';
                document.getElementById('messages-div').classList.add('hide');
                toggleElementVisibility('channel-div', 'channels-div');
            }
        });
        if (isMember) {
            document.getElementById('user-channels-list').appendChild(clone);
        } else {
            document.getElementById('public-channels-list').appendChild(clone);
        }
    }
};

/**
 * 2.2.2. Create channel
 */
document.getElementById('create-channel-btn').addEventListener('click', () => {
    toggleElementVisibility('create-channel-form', currView);
});

document.getElementById('create-channel-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('create-channel-name').value;
    const description = document.getElementById('create-channel-description').value;
    const type = document.querySelector('input[name="channel-type"]:checked').value;
    const isPrivate = type === 'Private' ? true : false;

    if (!name) {
        showModal(createErrorModalBody("Please enter a name for your channel"));
        return;
    }
    makeRequest('/channel', 'POST', {
        name: name,
        private: isPrivate,
        description: description,
    }).then((data) => {
        displayChannels();
        toggleElementVisibility('channels-div', currView);
    });
});

/**
 * 2.2.3 View and edit channel details
 */

/**
 * Name, description, pub/priv setting, creation timestamp, name of creator
 * Or only name and pub/priv setting if user is not a member
 */
const showChannelDetails = (id, name, isPrivate, creatorId, isMember) => {
    document.getElementById('channel-id').innerText = 'ID: ' + id;
    const status = document.getElementById('channel-status');
    
    if (!isPrivate) {
        status.classList.add('bg-primary');
        status.classList.remove('bg-secondary');
        status.innerText = 'Public';
    } else {
        status.classList.add('bg-secondary');
        status.classList.remove('bg-primary');
        status.innerText = 'Private';
    }
    if (!isMember) {
        document.getElementById('channel-heading').innerText = name;
        document.getElementById('channel-hidden-details').classList.add('hide');
        return;
    }
    let channelName = '';
    let username = '';
    let timestamp = '';
    let description = '';

    makeRequest('/user/' + creatorId, 'GET').then((userData) => {
        username = 'Created by ' + userData.name;
    }).then(makeRequest('/channel/' + id, 'GET').then((channelData) => {
        channelName = channelData.name;
        timestamp = ' on ' + parseISOString(channelData.createdAt);
        description = channelData.description;
    }).then(() => {
        document.getElementById('channel-heading').innerText = channelName;
        document.getElementById('channel-creator').innerText = username;
        document.getElementById('channel-timestamp-created').innerText = timestamp;
        document.getElementById('channel-description').innerText = description;
    }));

};

// Convert timestamp from ISO to UTC string, adapted from:
// https://stackoverflow.com/questions/27012854/how-to-change-iso-date-string-to-date-object
const parseISOString = (s) => {
    var b = s.split(/\D+/);
    let timestring = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    const dayNight = timestring.getHours() >= 12 ? 'PM' : 'AM';
    let res = timestring.toUTCString().split(' ');
    res.pop();
    res = res.join(' ') + dayNight;
    return res;
};

/**
 * Join channel - show channel details, messages and leave and edit button
 */
document.getElementById('join-channel-btn').addEventListener('click', () => {
    const channelId = getChannelId();
    
    makeRequest('/channel/' + channelId + '/join', 'POST').then((data) => {
        document.getElementById('channel-hidden-details').classList.remove('hide');
        toggleElementVisibility('leave-channel-btn', 'join-channel-btn');
        document.getElementById('edit-channel-btn').classList.remove('hide');
        displayMessages(channelId, 0);
    });    
});

/**
 * Leave channel - hide channel details and messages; show join button
 */
document.getElementById('leave-channel-btn').addEventListener('click', () => {
    const channelId = getChannelId();

    makeRequest('/channel/' + channelId + '/leave', 'POST').then(() => {
        displayChannels();
    }).then(() => {
        toggleElementVisibility('join-channel-btn', 'leave-channel-btn');
        document.getElementById('edit-channel-btn').classList.add('hide');
        toggleElementVisibility('channels-div', 'channel-div');
        document.getElementById('channel-messages').innerText = '';                
    });    
});

/**
 * Edit channel
 */
 document.getElementById('edit-channel-btn').addEventListener('click', () => {
    toggleElementVisibility('edit-channel-form', currView);
});

document.getElementById('edit-channel-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const channelId = getChannelId();
    const name = document.getElementById('edit-channel-name').value;
    const description = document.getElementById('edit-channel-description').value;

    if (!name) {
        showModal(createErrorModalBody("Please enter a name for your channel"));
        return;
    }
    makeRequest('/channel/' + channelId, 'PUT', {
        name: name,
        description: description,
    }).then((data) => {
        displayChannels();
        toggleElementVisibility('channels-div', currView);
    });
});

/**
 * 2.3.1 View channel messages

 */
const displayMessages = (channelId, index) => {
    let channelMessages = null;
    toggleElementVisibility('channel-div', 'channels-div');
    document.getElementById('messages-div').classList.remove('hide');
    makeRequest('/message/' + channelId + '?start=' + index, 'GET').then((data) => {
        document.getElementById('channel-messages').innerText = '';
        channelMessages = data.messages;
    })
    .then(getUsersInChannel(channelId).then((members) => 
        renderMessages(channelMessages, members)));
};

const renderMessages = (messages, users) => {
    if (!messages) {
        const channelId = getChannelId();
        paginationCount = 0;
        messageIndex = 0;
        displayMessages(channelId, messageIndex);
    } else if (messages.length < numMessagesShown) {
        document.getElementById('paginate-right').classList.add('hide');
    } else {
        document.getElementById('paginate-right').classList.remove('hide');
    }
    makeRequest('/user', 'GET').then((data) => {
        for (const member of users) {
            for (const user of data.users) {
                if (member.email === user.email) {
                    member['id'] = user.id;
                }
            }
        }
    }).then(() => {
        for (const messageObj of messages) {
            renderMessageItem(messageObj, users);
        }        
    })

};

const renderMessageItem = (message, members) => {
    let sender = null;
    for (const member of members) {
        if (message.sender === member.id) {
            sender = member;
        }
    }
    const messageItem = document.createElement('li');
    messageItem.classList.add(
        'list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
    messageItem.setAttribute('style', 'border-radius: 10px;');

    const pic = makeProfilePic(sender.image);
    const usernameTimestamp = document.createElement('p');
    let sentImg = null;
    const deleteMsg = document.createElement('span');
    deleteMsg.innerText = 'Delete message';
    deleteMsg.classList.add('link');
    deleteMsg.addEventListener('click', () => deleteMessage(message.id))

    usernameTimestamp.classList.add('fw-bold');
    usernameTimestamp.innerText = 
        sender.name +' (' + parseISOString(message.sentAt) + '): ';
    if (!message.message) {
        sentImg = document.createElement('img');
        sentImg.classList.add('sent-photo');
        sentImg.src = message.image;
        sentImg.addEventListener('click', () => enlargeImg(sentImg.cloneNode(true)))
        // handle showing image: if append to messageItem doesn't work, do channel-messages
    } else {
        messageItem.innerText = message.message;
    }
    
    document.getElementById('channel-messages').appendChild(pic);
    document.getElementById('channel-messages').appendChild(usernameTimestamp);
    if (sentImg) {
        document.getElementById('channel-messages').appendChild(sentImg);
    } else {
        document.getElementById('channel-messages').appendChild(messageItem);
    }
    document.getElementById('channel-messages').appendChild(deleteMsg);
};

/**
 * 2.3.4 Delete message
 */
const deleteMessage = (messageId) => {
    const channelId = getChannelId();
    makeRequest('/message/' + channelId + '/' + messageId, 'DELETE', {}).then((data) => {
        displayMessages(channelId, messageIndex);
    });
};

const makeProfilePic = (image) => {
    let profilePic = document.createElement('img');
    profilePic.classList.add('profile-pic');
    profilePic.src = image ? image : defaultImage;
    return profilePic;
};

// recursive fetch: get user ids from channel, then get user profile for these
const getUsersInChannel = (channelId) => {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:5005/channel/" + channelId, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then((res) => res.json())
        .then((data) => {
            Promise.all(
                data.members.map((userId) =>
                    fetch(`http://localhost:5005/user/${userId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        }
                    }).then((res, userId) => 
                        res.json()
                    )
                )
            ).then((memberProfiles) => resolve(memberProfiles));
        });
    });    
};

/**
 * 2.3.2 Message pagination (25 messages per page)
 */
document.getElementById('paginate-right').addEventListener('click', () => {
    const channelId = getChannelId();

    messageIndex = (paginationCount + 1) * numMessagesShown;
    paginationCount += 1;
    setTimeout(displayMessages(channelId, messageIndex), 2000);
    document.getElementById('paginate-left').classList.remove('hide');
});

document.getElementById('paginate-left').addEventListener('click', () => {
    const channelId = getChannelId();

    messageIndex = (paginationCount - 1) * numMessagesShown;
    if (messageIndex < 0) {
        document.getElementById('paginate-left').classList.add('hide');
        return;
    }
    paginationCount -= 1;
    if (paginationCount === 0) {
        document.getElementById('paginate-left').classList.add('hide');
    }
    setTimeout(displayMessages(channelId, messageIndex), 2000);
    document.getElementById('paginate-right').classList.remove('hide');
});

/**
 * 2.3.3 Send text messages
 */
 document.getElementById('msg-send-btn').addEventListener('click', () => {
    const msg = document.getElementById('msg-send-text').value;
    const channelId = getChannelId();
    
    if (!msg) {
        showModal(createErrorModalBody('You cannot send an empty message'));
        return;
    }
    
    makeRequest('/message/' + channelId, 'POST', {
        message: msg,
    }).then((data) => {
        displayMessages(channelId, messageIndex);
    });
});

/**
 * 2.5.1 Sending photos in channels
 */
 document.getElementById('photo-send-btn').addEventListener('click', () => {
    const link = document.getElementById('msg-send-photo').value;
    const channelId = getChannelId();
    
    if (!link) {
        showModal(createErrorModalBody('You must enter a base64'));
        return;
    }
    
    makeRequest('/message/' + channelId, 'POST', {
        image: link,
    }).then((data) => {
        displayMessages(channelId, messageIndex);
    });
});

/**
 * 2.5.2 Enlarging photos on click
 */
const enlargeImg = (img) => {
    img.style.transform = 'scale(2)';
    const modalBody = modalElement.querySelector('.modal-body');
    const modalTitle = document.getElementsByClassName('modal-title fs-5')[0];

    modalBody.innerText = '';
    modalBody.append(img);
    modalTitle.innerText = 'Viewing image';

    modal.show();
};

/**
 * *****************************************************************************
 *                              BONUS FEATURES
 * *****************************************************************************
 */

/**
 * Logout and show empty login form
 */
document.getElementById('logout').addEventListener('click', (event) => {
    event.preventDefault();
    
    makeRequest('/auth/logout', 'POST').then((data) => {
        token = null;
        userId = null;
        clearForm(document.getElementById('register-form').classList.contains('hide'));

        // Hide all elements except for login form, nav and footer
        toggleElementVisibility('login-form', 'register-form');
        toggleElementVisibility('logged-out', 'logged-in');
        toggleElementVisibility('channels-div', 'channel-div');
        document.getElementById('channels-link').style.display = 'none';
        document.getElementById('account-dropdown').style.display = 'none';
        document.getElementById('create-channel-form').classList.add('hide');
    });
});

/**
 * Home link
 */
document.getElementById('home').addEventListener('click', (event) => {
    event.preventDefault();
    scroll(0,0);
    if (!document.getElementById('logged-in').classList.contains('hide')) {
        displayChannels();
        toggleElementVisibility('channels-div', currView);
    }
});
