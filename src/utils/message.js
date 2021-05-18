export function generateAllocateMessageHtml({
                                                staffName,
                                                managerName,
                                                title,
                                                description,
                                                location,
                                                startTime,
                                                endTime
                                            }) {

    return `
<!doctype html>
<html lang="en">
<body>
<div>

<p class="text-justify">
    Dear ${staffName},
</p>
<p class="text-justify">
This is an automatic message. ${managerName} has allocated a new shift for you. Here is the detail:
<p>Shift name: ${title}</p>
<p>Start time: ${startTime}</p>
<p>End time: ${endTime}</p>
<p>Location: ${location}</p>
<p>Description: </p>
<p>${description}</p>
<p>Kind regards,</p>
<p>${managerName}</p>

</p>
 
</div> 
</body>
</html>`
}

export function generateAcceptHtml({staffName, managerName, title, description, location, startTime, endTime}) {

    return `
<!doctype html>
<html lang="en">
<body>
  <div class="text-justify">
<p>Dear ${managerName},</p>
<p>This is an automatic message. ${staffName} has confirmed an allocation. Here is the detail:</p>
<p>Shift name: ${title}</p>
<p>Start time: ${startTime}</p>
<p>End time: ${endTime}</p>
<p>Location: ${location}</p>
<p>Description: </p>
<p>${description}</p>
<p>Kind regards,</p>
<p>${staffName}</p>
 
</div>
</body>
</html>

 `
}

export function generateRejectHtml({staffName, managerName, title, description, location, startTime, endTime}, reason) {

    return (
        `
<!doctype html>
<html lang="en">
<body>
<div class="text-justify">
<p>Dear ${managerName},</p>
<p>This is an automatic message. ${staffName} has rejected an allocation. Here is the detail:</p>
<p>Shift name: ${title}</p>
<p>Start time: ${startTime}</p>
<p>End time: ${endTime}</p>
<p>Location: ${location}</p>
<p>Description: </p>
<p>${description}</p>
<p>Reason: </p>
<p>${reason}</p>
<p>Kind regards,</p>
<p>${staffName}</p>
 
</div></body>
</html> `)
}

export function generateCancelHtml({staffName, managerName, title, description, location, startTime, endTime}, reason) {

    return (
        `
<!doctype html>
<html lang="en">
<body>
<div class="text-justify">
<p>Dear ${managerName},</p>
<p>This is an automatic message. ${staffName} has canceled an allocation. Here is the detail:</p>
<p>Shift name: ${title}</p>
<p>Start time: ${startTime}</p>
<p>End time: ${endTime}</p>
<p>Location: ${location}</p>
<p>Description: </p>
<p>${description}</p>
<p>Reason: </p>
<p>${reason}</p>
<p>Kind regards,</p>
<p>${staffName}</p>
 
</div></body>
</html> `)
}