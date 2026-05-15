# ThaiBev Queue System

ระบบจัดการคิว (Queue Management System) พัฒนาด้วย .NET 10 (Backend) และ Angular (Frontend)

## วิธีการรันโปรเจกต์ (Running the Project)

### 1. Backend (API)
1. เข้าไปที่โฟลเดอร์ `ThaiBev.Api`
2. รันคำสั่ง:
   ```bash
   dotnet run
   ```
   API จะทำงานที่: `http://localhost:5059`

### 2. Frontend (Web)
1. เข้าไปที่โฟลเดอร์ `ThaiBev.Web`
2. ติดตั้ง dependencies (ถ้ายังไม่ได้ทำ):
   ```bash
   npm install
   ```
3. รันคำสั่ง:
   ```bash
   npm start
   ```
   เข้าใช้งานได้ที่: `http://localhost:4200`

---

## วิธีการรัน Unit Tests (Bonus Points)

โปรเจกต์นี้มีการทำ Unit Tests ทั้งฝั่ง Backend และ Frontend เพื่อตรวจสอบความถูกต้องของระบบ

### 1. ทดสอบ Backend (xUnit)
รันคำสั่งที่โฟลเดอร์นอกสุดของโปรเจกต์:
```bash
dotnet test
```
*ระบบจะทดสอบ Logic การออกเลขคิว (A0-Z9), การเพิ่มคิว และการวนคิวกลับมาที่ A0*

### 2. ทดสอบ Frontend (Vitest)
เข้าไปที่โฟลเดอร์ `ThaiBev.Web` แล้วรันคำสั่ง:
```bash
npm test
```
*ระบบจะทดสอบการแสดงผลหมายเลขคิว และรูปแบบวันที่เวลาในหน้าจอรับบัตรคิว*

**ดูผลทดสอบแบบ UI (สวยงาม):**
```bash
npm test -- --ui
```

---
