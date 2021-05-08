export function generateAllocateMessageHtml({staffName, managerName, title, description, location, startTime, endTime}) {

    return `<div>

<p class="text-justify">
    Dear ${staffName},
</p>
<p class="text-justify">
This is an automatic message. I have allocated a new shift for you. If your have any issues, please contact me. 
<p>Shift name: ${title}</p>
<p>Start time: ${startTime}</p>
<p>End time: ${endTime}</p>
<p>Location: ${location}</p>
<p>Description: </p>
<p>${description}</p>
<p>Kind regards,</p>
<p>${managerName}.</p>

</p>
 
</div> `
}

export function generateAcceptHtml({staffName, managerName, title, description, location, startTime, endTime}) {

    return `<div class="text-justify">
<p>Dear ${managerName},</p>
<p>This is an automatic message. I have confirmed an allocation. Here is the detail.</p>
<p>Shift name: ${title}</p>
<p>Start time: ${startTime}</p>
<p>End time: ${endTime}</p>
<p>Location: ${location}</p>
<p>Description: </p>
<p>${description}</p>
<p>Kind regards,</p>
<p>${staffName}.</p>
 
</div> `
}

export function generateRejectHtml({staffName, managerName, title, description, location, startTime, endTime},reason) {

    return (
        `<div class="text-justify">
<p>Dear ${managerName},</p>
<p>This is an automatic message. I have rejected an allocation. Here is the detail.</p>
<p>Shift name: ${title}</p>
<p>Start time: ${startTime}</p>
<p>End time: ${endTime}</p>
<p>Location: ${location}</p>
<p>Description: </p>
<p>${description}</p>
<p>Reason: </p>
<p>${reason}</p>
<p>Kind regards,</p>
<p>${staffName}.</p>
 
</div> `)
}