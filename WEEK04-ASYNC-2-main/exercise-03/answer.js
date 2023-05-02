// ข้อ 3.1
function getDogDemo(url) {
  // hint: เรียกใช้ getAPI() โดยดึงข้อมูลจาก url = https://dog.ceo/api/breeds/image/random
  // ลอง console.log() ดูว่าข้อมูลที่ได้มาเป็นอย่างไร
  let count = document.getElementById('dogTime').innerHTML

  const counting = setInterval( ()=> {
    count --
    document.getElementById('dogTime').innerHTML = count;
    if(count === -1){
      clearInterval(counting)
      getAPI('https://dog.ceo/api/breeds/image/random',(result) => {
        let dogImg = document.getElementById('dogImg')
        dogImg.setAttribute('src',result.message)
      })
     document.getElementById('dogTime').innerHTML = ''
    }
  },1000);

}


// ข้อ 3.2
function Rainbow() {
  //TODO
  // 1. ในกรณีที่ status = 'success' ให้แสดงตัวเลขเป็นสีตามที่กำหนดในแต่ละ STATE
  // 2. ให้แสดงชื่อ STATE (STATE 1 หรือ STATE 2 หรือ STATE 3) ในกล่องข้อความเมื่อเกิด Error
  // 3. เปลี่ยนสีข้อความเป็นสีแดงเมื่อเกิด Error (class = 'has-text-error')

  const rainbow = document.getElementById("rainbow")

  console.log(getResult())
  
  console.log(rainbow)

  setTimeout(() => {
    // STATE 1 color = 'has-text-primary'
    const temp = getResult();

    if(temp.status === 'success'){
      rainbow.innerHTML = `${temp.text}`
      rainbow.setAttribute('class', 'has-text-primary')
    } else {
      rainbow.innerHTML = 'STATE 1'
      rainbow.setAttribute('class','has-text-danger')
    }
      setTimeout(() => {
        // STATE 2 color = 'has-text-success'
        const temp = getResult();

        if(temp.status === 'success'){
          rainbow.innerHTML = `${temp.text}`
          rainbow.setAttribute('class', 'has-text-primary')
        } else {
          rainbow.innerHTML = 'STATE 2'
          rainbow.setAttribute('class','has-text-danger')
        }
        setTimeout(() => {
          // STATE 3 color = 'has-text-success'
          const temp = getResult();

          if(temp.status === 'success'){
            rainbow.innerHTML = `${temp.text}`
            rainbow.setAttribute('class', 'has-text-primary')
          } else {
            rainbow.innerHTML = 'STATE 3'
            rainbow.setAttribute('class','has-text-danger')
          }
        }, 2000)

      }, 2000)

  }, 2000)
}

function getResult(){
  const num = Math.floor(Math.random() * 10)
  console.log(num)
  if(num > 5) {
    return {
      'status': 'success',
      'text': num
    }
  }else{
    return {
      'status': 'error',
      'text': num
    }
  }
}

// ข้อ 3.3
async function evenNumber(num){

  const a = async () => {
    if(num % 2 === 0) {
      document.getElementById('result').innerHTML = `success : ${num} is an even number`
    } else {
      document.getElementById('result').innerHTML = `success : ${num} is an even number`
    }
  }

  await a()
  // hint : ทำการสร้าง promise และเรียกใช้
  // const a = async function(resolve, reject) {
  //   if(num % 2 === 0){
  //     resolve(num)
  //   } else {
  //     reject(num)
  //   }
  // }
  //     .then((fulfilled) => {
  //       document.getElementById('result').innerHTML = `success : ${fulfilled} is an even number`
  //     })
  //     .catch((error) => {
  //       document.getElementById('result').innerHTML = `error : ${error} is not an even number`
  //     })
}

// ข้อ 3.4
function task(id) {
  const delay = parseInt(Math.random() * 1000)
  // return promise
  const testing =  new Promise((resolve, reject) => {
    setTimeout(() => {
      if(delay < 500){
        resolve(`task [${id}]]: ${delay}ms ... PASS!`)
      } else {
        reject(`task [${id}]: ${delay}ms ... NOT PASS!`)
      }
    },delay)
  })

  testing
      .then((fulfilled) => { console.log(fulfilled)
      })
      .catch((error) => { console.log(error)
      })
      
  return testing
}

function tester() {
  // hint : task(1).then().catch() ..... task(4)...
  // ต้องเรียก function task 4 ครั้ง เปลี่ยน id ไปเรื่อยๆ
  for (let i = 1; i <= 4; i++) {
    task(i)
  }
  
}

// ข้อ 3.5
// hint : เรียก getAPI() ที่ url = https://api.thecatapi.com/v1/images/search 
// อย่าลืม console.log() ดูข้อมูลที่ได้ด้วยว่ามีโครงสร้างแบบใด
function checkAuth(password) {
  return password === 'Cisco' ? true : false
}

function fetchData(password) {
  const fetch = new Promise((resolve, reject) => {
    if(checkAuth(password)){
      resolve('รหัสผ่านถูกต้อง')
    } else {
      reject('รหัสผ่านไม่ถูกต้อง')
    }
  })
  fetch
    .then((fulfilled) => {
      alert(fulfilled)
      getAPI('https://api.thecatapi.com/v1/images/search', (res) => {
        cat.src = res[0].url
      })
    })
    .catch((error) => {
      alert(error)
    })
}

// GET API
function getAPI(url, success, error) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.response);
      success(res);
    } else if (this.readyState == 4) {
      const res = JSON.parse(this.response);
      error(res);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.send();
}
