export function generateMessageHtml(message) {

    return `<div>

<p class="text-justify">
    Hi, ${message['receiver']['name']}
</p>
<p class="text-justify">
This is a automatic message. I have allocate a new shift for you. If your have any issues, please contact me. 
My email is ${message['sender']['email']} and my phone is ${message['sender']['phone']}. 
The shift detail:
Title is ${message.title}
Location is ${message.location}
start time is ${message.startTime}
duration is 

</p>
 
</div> `
}

export function generateAcceptHtml({staffName, managerName, title, description, location, startTime, endTime}) {

    return `<div class="text-justify">
<p>Dear ${managerName},</p>
<p>This is an automatic message. Staff ${staffName} has confirmed an allocation. Here is the detail.</p>
<p>Shift name: ${title}</p>
<p>Start time: ${startTime}</p>
<p>End time: ${endTime}</p>
<p>Location: ${location}</p>
<p>Description: </p>
<p>${description}</p>
<p>Kind regards,</p>
<p>Staff ${staffName}.</p>
 
</div> `
}

export function generateRejectHtml({staffName, managerName, title, description, location, startTime, endTime},reason) {

    return (
        `<div class="text-justify">
<p>Dear ${managerName},</p>
<p>This is an automatic message. Staff ${staffName} has rejected an allocation. Here is the detail.</p>
<p>Shift name: ${title}</p>
<p>Start time: ${startTime}</p>
<p>End time: ${endTime}</p>
<p>Location: ${location}</p>
<p>Description: </p>
<p>${description}</p>
<p>Reason: </p>
<p>${reason}</p>
<p>Kind regards,</p>
<p>Staff ${staffName}.</p>
 
</div> `)
}