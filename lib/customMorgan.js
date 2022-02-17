const morgan = require('morgan');
const chalk = require('chalk');
const colorText = require('./colortext');


const customMorgan = morgan((tokens,req,res) => {
    let timestamp = new Date;
    var timeZoneOffsetHrs = -(new Date().getTimezoneOffset() / 60);
    let month = timestamp.getMonth()<10 ? `0${timestamp.getMonth()+1}` : `${timestamp.getMonth()+1}`;
    let day = timestamp.getDate()<10 ? `0${timestamp.getDate()}` : `${timestamp.getDate()}`;
    let hours = timestamp.getHours()<10 ? `0${timestamp.getHours()}` : `${timestamp.getHours()}`;
    let minutes = timestamp.getMinutes()<10 ? `0${timestamp.getMinutes()}` : `${timestamp.getMinutes()}`;
    let seconds = timestamp.getSeconds()<10 ? `0${timestamp.getseconds()}` : `${timestamp.getSeconds()}`;
    
    if(Math.abs(timeZoneOffsetHrs)<10){
        var timezoneOffsetHrs_corrected;
        if(timeZoneOffsetHrs < 0){
            timezoneOffsetHrs_corrected = `-0${Math.abs(timeZoneOffsetHrs)}`;
        }else{
            timezoneOffsetHrs_corrected = `0${Math.abs(timeZoneOffsetHrs)}`;
        }
    }

    return [
        `[${timestamp.getFullYear()}:${month}:${day} ${hours}:${minutes}:${seconds} T${timezoneOffsetHrs_corrected}:00]`, 
        ' : : ',
        chalk.green(tokens.method(req, res)),
        ' : : ',         
        colorText(tokens.status(req, res)),
        colorText(' : : '),
        colorText(tokens.url(req, res)),
        colorText(' : : '),
        colorText(tokens['remote-addr'](req, res)),
        colorText(' : : '),
        colorText('from ' + tokens.referrer(req, res)),
        colorText(' : : '),
        colorText(tokens['response-time'](req, res) + ' ms'),
        '\n',
    ].join('');
});

module.exports = customMorgan;