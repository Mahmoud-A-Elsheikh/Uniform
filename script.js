let users = [];
let savedData = {};
let isEdit = false;

fetch("data.json")
  .then(res => res.json())
  .then(data => users = data);

function verifyGroup() {
  const groupId = document.getElementById("groupNumber").value;
  const user = users.find(u => u.groupId == groupId);

  if (!user) {
    alert("❌ رقم المجموعة غير صحيح");
    return;
  }

  document.getElementById("fullName").value = user.Name;
  document.getElementById("jobId").value = user.jobNum;
  document.getElementById("userData").classList.remove("hidden");

  if (savedData[groupId]) {
    document.getElementById("warning").classList.remove("hidden");
    isEdit = true;
  } else {
    document.getElementById("warning").classList.add("hidden");
    isEdit = false;
  }
}

function showSizes() {
  const dept = document.querySelector('input[name="dept"]:checked').value;
  const s = document.getElementById("sizes");
  s.innerHTML = "";

  if (dept === "امن") {
    s.innerHTML = `
      <label>البدلة</label><input type="number">
      <label>القميص</label><input type="number">
    `;
  }

  if (dept === "بوفية") {
    s.innerHTML = `
      <label>بنطلون</label><input type="number">
      <label>قميص</label><input type="number">
      <label>بلوفر</label>
      <select>
        <option>S</option><option>M</option><option>L</option>
        <option>XL</option><option>XXL</option><option>XXXL</option>
      </select>
    `;
  }

  if (dept === "نظافة") {
    s.innerHTML = `
      <label>بنطلون الخدمات</label><input type="number">
      <label>تي شيرت</label><input type="number">
      <label>حذاء</label><input type="number">
    `;
  }
}

function saveData() {
  const groupId = document.getElementById("groupNumber").value;
  const dept = document.querySelector('input[name="dept"]:checked')?.value;

  if (!dept) {
    alert("❌ اختر القسم");
    return;
  }

  savedData[groupId] = {
    name: document.getElementById("fullName").value,
    groupId,
    jobNum: document.getElementById("jobId").value,
    dept
  };

  alert(isEdit ? "✏️ تم تعديل البيانات بنجاح" : "✅ تم حفظ البيانات");
}

function exportToExcel() {
  let csv = "الاسم,رقم المجموعة,الرقم الوظيفي,القسم\n";

  Object.values(savedData).forEach(r => {
    csv += `${r.name},${r.groupId},${r.jobNum},${r.dept}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "results.csv";
  link.click();
}
