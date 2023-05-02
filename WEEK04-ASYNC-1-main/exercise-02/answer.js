// ข้อ 2.1

function display(msg) {
    window.confirm() ? msg = 'ยืนยันจ้า' : msg = 'ไม่ยืนยัน'

    let div = document.getElementById('ex01-div')
    div.innerHTML = msg
}

function showConfirm(callback) {
    // You code here
    callback(callback);
}

// ข้อ 2.2
function start() {
    // hint: ส่ง callback function เข้าไปเป็น argument ของ setTimeout()
    setTimeout(() => {
      let start = document.getElementById('start')
      start.innerHTML = 'Program started'
      setTimeout(() => {
        let process = document.getElementById('process')
        process.innerHTML = 'Hello World'
        setTimeout(() => {
          let end = document.getElementById('end')
          end.innerHTML = 'Program ended'
        }, 3000);
      }, 2000);
    }, 0);
}

// ข้อ 2.3
function stopTime() {
    let interval = document.getElementById('Time').value
    let setMinute = document.getElementById('setMinute')
    let setSecond = document.getElementById('setSecond')

    const counting = setInterval(() => {
      setMinute.innerHTML = padding(Math.floor(interval / 60))
      setSecond.innerHTML = padding(Math.floor(interval % 60))

      interval -= 1;


      interval === 0 ? clearInterval(counting) : null
    }, 1000);

}

function padding(number) {
  return (number < 10 ? '0' : '') + number
}

