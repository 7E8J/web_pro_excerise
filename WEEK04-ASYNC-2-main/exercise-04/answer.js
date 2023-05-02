// ข้อ4.1
async function getAllUser(){
    //TODO
    // 1. ให้ใช้ Try Catch
    // 2. เรียกใช้ฟังก์ชัน ApiDelay()
    // 3. หากเรียกฟังก์ชันสำเร็จให้ (status: 200) ให้นำ message แสดงในกล่องข้อความ
    // 4. หากเรียกฟังก์ชันไม่สำเร็จ (message: "SERVER ERROR") ให้นำ message แสดงในกล่องข้อความ
  try{
    const fetch = await ApiDelay();
    console.log(fetch)

    document.getElementById('TA').innerHTML = fetch.message
  } catch(error) {
    
    document.getElementById('TA').innerHTML = error.message
  } 
}

// ข้อ 4.2 
function checkAuth(password) {
  if(password === 'In4matioN'){
    return `รหัสผ่านถูกต้อง`
  } else {
    return `รหัสผ่านไม่ถูกต้อง`

    // throw new Error(`รหัสผ่านไม่ถูกต้อง`)
  }
}

async function fetchData(password) {
   try {
    alert(checkAuth(password))
    const res = await fetch('https://api.thecatapi.com/v1/images/search')
    const result = await res.json();
    cat.src = result[0].url
   } catch (error) {
      alert(error.message)
   }
}


/* 
    Function สำหรับ TA กับ อาจารย์
    นักศึกษากรุณา อย่าแก้ไข
*/

async function ApiDelay () {
      return new Promise(resolve => {
        setTimeout(() => resolve(_fakeAPI()), 2000)
    })
}

async function _fakeAPI() {
    const user = ["Bank", "Mac", "Takai", "Fluke"]
    
    if(Math.floor(Math.random() * 3) === 1){
        throw new Error("SERVER ERROR")
    }

    return {
        status: 200,
        message:user[Math.floor(Math.random() * 4)]
    }
}
