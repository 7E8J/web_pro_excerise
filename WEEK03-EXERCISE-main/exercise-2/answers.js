function convertADtoBE(input) {
    // AD คือคริสดศักราย
    // BE คือพุทธศักราช
    //
    // TODO: แปลงปีใน คริสตศักราช เป็น พุทธศักราช เช่น 2000 เป็น "พ.ศ. 2543"
    // โดยให้เติมตัวอักษร พ.ศ. เข้าไปด้านหน้าด้วย
    
      return input >= 543 ? `พ.ศ.${input + 543}` : "ไม่ถูกต้อง";
}

function evenOrOdd(input) {
    // TODO: ให้ตรวจสอบว่าตัวเลข input เป็นเลขคู่หรือเลขคี่

    return input >= 0 && input % 2 === 0 ? "even" : "odd";
}

function getFullName(input) {
    // TODO: ให้นำคำนำหน้าชื่อ ชื่อต้น นามสกุล มาต่อกัน

    return input.sex === "male" ? `Mr. ${input.firstName} ${input.lastName}` : `Ms. ${input.firstName} ${input.lastName.toUpperCase()}`;
    // return `Mr. ${input.firstName} ${input.lastName}`;
}

function getFirstName(input) {
    // TODO: ให้ทำการตัดนามสกุลออกโดยใช้ indexOf() และ substring()

    return input.substr(0, input.indexOf(" "));
}