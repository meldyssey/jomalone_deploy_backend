const express = require("express");
const app = express();
const db = require("mysql2");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "imgs/");
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            let fName =
                path.basename(file.originalname, ext) + Date.now() + ext;
            //한글인코딩
            let newFName = Buffer.from(fName, "latin1").toString("utf8");

            cb(null, newFName);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/bk/imgs", express.static(path.join(__dirname, "imgs")));

const adminCount = require("./controller/AdminMain.js");
app.use("/bk/", adminCount());

//관리자페이지 - 회원정보조회
const memberListRouter = require("./controller/MemberList.js");
app.use("/bk/admin/member", memberListRouter());

const productRouter = require("./controller/product.js");
app.use("/bk/admin/product", productRouter());

const productHomeRouter = require("./controller/productHome.js");
app.use("/bk/product/", productHomeRouter());

const basketRouter = require("./controller/Basket.js");
app.use("/bk/basket/", basketRouter());

const payment1Router = require("./controller/Payment1.js");
app.use("/bk/payment1/", payment1Router());

const payment2Router = require("./controller/Payment2.js");
app.use("/bk/payment2/", payment2Router());

const adminOrderRouter = require("./controller/adminOrder.js");
app.use("/bk/admin/order", adminOrderRouter());

// 일대일문의
const onetooneRouter = require("./controller/one_to_one.js");
app.use("/bk/onetoone/", onetooneRouter());

//리뷰
const reviewRouter = require("./controller/review.js");
app.use("/bk/review/", reviewRouter());
//리뷰신고
const reportRouter = require("./controller/report.js");
app.use("/bk/reports/", reportRouter);

//회원가입 라우터
const signUpRouter = require("./controller/SignUp.js");
app.use("/bk/signUp", signUpRouter);

//중복확인 라우터
const emailChkRouter = require("./controller/SignUp.js");
app.use("/bk/signUp", emailChkRouter);

//로그인 라우터
const signInRouter = require("./controller/SignIn.js");
app.use("/bk/signIn", signInRouter);

//마이페이지 라우터
const myinfoRouter = require("./controller/MyInfo.js");
app.use("/bk/myPage/", myinfoRouter());

//회원정보 수정 라우터
const myinfoeditRouter = require("./controller/MyInfo.js");
app.use("/bk/myPage/myinfoEdit", myinfoeditRouter());

//배송주소록 라우터
const addressListRouter = require("./controller/MyInfo.js");
app.use("/bk/myPage/addressList", addressListRouter());

//비밀번호찾기 라우터
const findPwRouter = require("./controller/FindPw.js");
app.use("/bk/", findPwRouter);

//주문내역보기 라우터
const ordersRouter = require("./controller/MyInfo.js");
app.use("/bk/myPage/viewOrders", ordersRouter());

//주문상세보기 라우터
const orderDetailRouter = require("./controller/OrderDetail.js");
app.use("/bk/myPage/orderDetail", orderDetailRouter());

const analysisRouter = require("./controller/analysis.js");
app.use("/bk/analysis", analysisRouter());

app.get("/bk/", (req, res) => {
    console.log("백엔드 서버 진입"); //정상작동 확인
    res.send("백엔드 서버 진입");
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5001, () => {
    console.log("서버 실행");
});
