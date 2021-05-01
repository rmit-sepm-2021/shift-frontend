let moment = require('moment')
export function ShiftListToTableData(list){
    for (const datum of list) {
        datum['createdTime'] = moment(datum['createdTime']).format("YYYY-MM-DD")
        datum['startTime'] = moment(datum['startTime']).format("YYYY-MM-DD HH:mm")
        datum['endTime'] = moment(datum['endTime']).format("YYYY-MM-DD HH:mm")
        datum['status'] = datum['statusStr']
    }
    return list
}