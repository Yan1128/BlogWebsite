module.exports = {
    formatTime(timestamp, fmt) {
        let postTime = timestamp;
        if(fmt=='Month-Date-Year'){
            return (postTime.getMonth() + 1) + "-" + postTime.getDate() + "-" + postTime.getFullYear();
        }else if(fmt=='Date-Month-Year'){
            return postTime.getDate() + "-" +(postTime.getMonth() + 1) + "-" +postTime.getFullYear();
        }else{
            return postTime.getFullYear() + "-" + (postTime.getMonth() + 1) + "-" + postTime.getDate();
        }
    }
}