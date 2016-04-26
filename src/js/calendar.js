/**
 * Created by lenovo on 2016/3/16.
 */
(function(window, undefined){
    window.onload = function(){
        var now = new Date();
        var tianGan = ["","甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
        var diZhi = ["","子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
        var zodiac = ["","鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
        var lunarMonth = ["","正","二","三","四","五","六","七","八","九","十","十一","腊"];
        var lunarDay = ["","一","二","三","四","五","六","七","八","九","十"];
        var days = [0,31,28,31,30,31,30,31,31,30,31,30,31];
        var holiday = {"1.1":"元旦", "2.14":"情人节", "3.8":"妇女节", "3.15":"国际消费者权益日", "3.18":"爱肝节",
                        "3.23":"国际气象日","4.1":"愚人节","4.7":"世界卫生日","4.22":"世界地球日","5.1":"国际劳动节","5.8":"世界红十字日",
            "5.12":"国际护士节","5.15":"国际家庭日","5.17":"国际电信日","6.1":"国际儿童节","6.5":"国际环保日","6.6":"国际爱眼日","6.26":"国际禁毒日",
            "7.11":"世界人口日","9.27":"世界旅游日","9.28":"国际聋人日","10.9":"世界邮政日","10.16":"世界粮食日","11.17":"国际学生日","12.25":"圣诞节"};
        var holiday2016 = ["1.1","1.2","1.3",'2.7','2.8','2.9','2.10','2.11','2.12','2.13','4.2','4.3','4.4','4.30','5.1','5.2','6.9','6.10','6.11',
                            '9.15','9.16','9.17','10.1','10.2','10.3','10.4','10.5','10.6','10.7'];
        var holidayDict = {"元旦":"1:1","春节":"2:8","清明":"4:4","劳动":"5:1","端午":"6:9","中秋":"9:15","国庆":"10:1"};

        var table = document.getElementById("table_calendar").getElementsByTagName("tbody")[0];
        var btnReturn = document.getElementById("return");
        var timeChooser = document.getElementsByClassName("time-chooser")[0];
        var clock = document.getElementsByClassName("clock")[0];

        var yearChooser = document.getElementById("year-chooser");
        var monthChooser = document.getElementById("month-chooser");

        var year, month, day, week;

//解释：0x095b0
//二进制：0000    1001 0101 1011 0000
//表示1980年没有闰月，从1月到12月的天数依次为：30、29、29、30 、29、30、29、30、 30、29、30、30。
        var lunarInfo =  [ 0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
            0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
            0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
            0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
            0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
            0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
            0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
            0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
            0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
            0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
            0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
            0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
            0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
            0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
            0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0];

        function cacuGanZhi(){                 //得到天干地支和生肖年
            var gan = (year - 3) % 10;
            var zhi = (year - 3) % 12;
            if(gan === 0){
                gan = 10;
            }
            if(zhi === 0){
                zhi = 12;
            }
            return tianGan[gan] + diZhi[zhi]+"年【"+zodiac[zhi]+"年】";
        }

//==== 传回农历 y年的总天数
        function lYearDays(y) {
            var i, sum = 348;
            for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0
            return (sum + leapDays(y));
        }

        function leapDays(y) {
            if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29)
            else return (0)
        }

        function leapMonth(y) {
            return (lunarInfo[y - 1900] & 0xf)
        }

//====================================== 传回农历 y年m月的总天数
        function monthDays(y, m) {
            return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29)
        }

        function Lunar(nowDate){
            var baseDate = new Date(1900, 0, 31);
            var offtime = (nowDate - baseDate) / 86400000;
            var temp;
            this.dayCyl = offtime + 40;
            this.monCyl = 14;
            for (var i = 1900; i < 2050 && offtime > 0; i++) {
                temp = lYearDays(i);
                offtime -= temp;
                this.monCyl += 12
            }
            if (offtime < 0) {
                offtime += temp;
                i--;
                this.monCyl -= 12
            }

            this.year = i;
            this.yearCyl = i - 1864;

            var leap = leapMonth(i); //闰哪个月
            this.isLeap = false;

            for (i = 1; i < 13 && offtime > 0; i++) {
                //闰月
                if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
                    --i; this.isLeap = true; temp = leapDays(this.year);
                }
                else {
                    temp = monthDays(this.year, i);
                }

                //解除闰月
                if (this.isLeap == true && i == (leap + 1)) {
                    this.isLeap = false;
                }

                offtime -= temp;
                if (this.isLeap == false) {
                    this.monCyl++;
                }
            }

            if (offtime == 0 && leap > 0 && i == leap + 1) {
                if (this.isLeap) {
                    this.isLeap = false;
                }
                else {
                    this.isLeap = true; --i; --this.monCyl;
                }
            }

            if (offtime < 0) {
                offtime += temp; --i; --this.monCyl;
            }

            this.month = i;
            this.day = offtime + 1;
        }

        function displayLunarDay(year, month, day){
            var tmpDate = new Date(year,--month,day);
            var luna = new Lunar(tmpDate);
            if(luna.day <= 10){
                var dayStr = "初"+lunarDay[luna.day];
            }else if(luna.day < 20){
                dayStr = "十"+lunarDay[luna.day-10];
            }else if(luna.day === 20) {
                dayStr = "二十";
            }else if(luna.day < 30){
                dayStr = "廿"+lunarDay[luna.day-20];
            }else{
                dayStr = "三十";
            }
            return dayStr;
        }

        function displayLunar(){
            var calenderTip = document.getElementsByClassName("calendar-tip")[0];
            var yearS = year.toString();
            var monthS = parseInt(month) < 10 ? "0"+month : month;
            var dayS = parseInt(day) < 10 ? "0"+day : day;

            if(week === 0){
                var tmp = "日";
            }else{
                tmp = lunarDay[week];
            }
            var weekS = "星期"+tmp;
            calenderTip.getElementsByTagName("span")[0].innerText = yearS+"-"+monthS+"-"+dayS+" "+weekS;


            var tmpDate = new Date(year,month-1,day);
            var luna = new Lunar(tmpDate);
            var monthStr = lunarMonth[luna.month] + "月";
            var dayStr = displayLunarDay(year, month, day);
            calenderTip.getElementsByClassName("tip-lunar")[0].innerHTML = "农历"+monthStr + dayStr+"<br/>"+cacuGanZhi();

            calenderTip.getElementsByClassName("tip-date")[0].innerText = day;
        }

        function getDays(year,month){
            if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)){
                if(month === 2){
                    return 29;
                }
            }
            return days[month];
        }

//获取该月一号是周几
        function getStartWeek() {
            var tempnum = day % 7;
            var tmpweek = week + 1; //今天周几
            var startweek = tmpweek + 7 - tempnum;
            return startweek > 7 ? startweek % 7 : startweek;
        }

//计算节气
        function getSolarTerm(year, month, day){
            month = month-1;
            var sTermInfo = [0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758];
            var solarTerm = ["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"];
            var tmp1 = new Date((31556925974.7*(year-1900)+sTermInfo[month*2+1]*60000)+Date.UTC(1900,0,6,2,5));
            var tmp2 = tmp1.getUTCDate();
            var solarTerms = "";
            if (tmp2==day)
                solarTerms = solarTerm[month*2+1];
            tmp1 = new Date((31556925974.7*(year-1900)+sTermInfo[month*2]*60000)+Date.UTC(1900,0,6,2,5));
            tmp2= tmp1.getUTCDate();
            if (tmp2==day)
                solarTerms = solarTerm[month*2];
            return solarTerms;
        }

        function getHtml(type, tmpyear, tmpmonth, tmpday){
            var tmplunar = displayLunarDay(tmpyear, tmpmonth, tmpday);
            var title = "";
            var displayrest = "norest";
            var date = tmpday;
            var classPre = "";
            var classNext = "normal-day";
            var solarTerm = getSolarTerm(tmpyear, tmpmonth, tmpday)
            if(solarTerm !== ''){
                tmplunar = solarTerm;
                classNext = "solar-day";
            }
            if(holiday[tmpmonth+"."+tmpday] !== undefined){
                tmplunar = holiday[tmpmonth+"."+tmpday];
                classNext = "world-day";
                title = tmplunar;
            }
            if(tmpyear === 2016){
                if(holiday2016.indexOf(tmpmonth+"."+tmpday) !== -1){
                    displayrest = "rest";
                    classNext = "holiday-day";
                }
            }
            if(type === 1){
                classPre = "pre-month";
            }else if(type === 2){
                classPre = "now-month";
                if(tmpday === day || (tmpyear=== now.getFullYear() && tmpmonth === now.getMonth()+1 && tmpday === now.getDate())){
                    classPre += " today";
                }
            }else{
                classPre="post-month";
            }
            return "<td class='"+classPre+"'><div class='"+displayrest+"'>休</div><b>"+date+"</b><span class='"+classNext+"' title='"+title+"'>"+tmplunar+"</span></td>";
        }

        //向前端页面展示的视图函数
        function monthView() {
            var days = getDays(year, month);
            var preYear = year;
            var postYear = year;
            var preMonth = month - 1;
            var postMonth = month + 1;
            var preMonthDays;
            if(preMonth === 0) {
                preYear = year - 1;
                preMonth = 12;
            }if(postMonth === 13) {
                postYear = year + 1;
                postMonth = 1;
            }
            preMonthDays = getDays(preYear, preMonth);

            var startweek = getStartWeek();
            var html = "";
            var index = 0;
            for (var i = 1; i < startweek; i++) {
                var preDay = (preMonthDays-startweek+i+1);
                html += getHtml(1,preYear,preMonth,preDay);
                index++;
            }
            for (var i = 1; i <= days; i++) {

                if (index % 7 == 0) {
                    html += "</tr><tr>";
                }
                html += getHtml(2,year,month,i);
                index++;
            }
            for (var i = 0; i < 15; i++) {
                if(index >= 42) {
                    break;
                }
                if (index % 7 == 0) {
                    html += "</tr><tr>";
                }
                var postDay = i+1;
                html += getHtml(3,postYear,postMonth,postDay);
                index++;

            }
            html += "</tr>";

            table.innerHTML = html;

        }

        function initTimeChooser(){
            for(var i=1902; i<2050;i++){
                yearChooser.innerHTML += "<option value='"+i+"'>"+i+"年</option>";
            }
            for(i = 2; i<=12;i++){
                monthChooser.innerHTML += "<option value='"+i+"'>"+i+"月</option>";
            }
        }

        function init(){
            var now = new Date();
            year = now.getFullYear();
            month = now.getMonth()+1;
            day = now.getDate();
            week = now.getDay();
            monthView();
            displayWeek();
            changeChooser();
            displayLunar();
        }

        function changeChooser(){
            yearChooser.options[year-1901].selected = true;
            monthChooser.options[month-1].selected = true;
        }

        function displayWeek(){
            var weekDay = table.getElementsByTagName("td");
            for(var i=0; i<weekDay.length; i++){
                if( i%7===5 || i%7===6){
                    weekDay[i].className += " week-day";
                }
            }
        }

        //年份 星期 假日选择的事件代理
        timeChooser.addEventListener("change", function(event){
            var node = event.target;
            if(node.id === "year-chooser"){
                year = Number(node.value);
                week = new Date(year, month-1, day).getDay();
            }else if(node.id === "month-chooser"){
                month = Number(node.value);
                week = new Date(year, month-1, day).getDay();
            }else if(node.id === "holiday-chooser"){
                var holidayStr = holidayDict[node.value];
                if(holidayStr !== undefined){
                    var nums = holidayStr.split(":");
                    year = 2016;
                    month = Number(nums[0]);
                    day = Number(nums[1]);
                }
            }
            //alert(year+"-"+month+"-"+day);
            monthView();
            displayWeek();
            displayLunar();
        }, false);

        //timeChooser的click事件代理，/上一年/下一年/上一月/下一月/
        timeChooser.addEventListener("click", function (event) {
            var node = event.target;
            if(node.id === "year-pre"){
                year--;
                if(year === 1900){
                    alert("请选择1900年以后的年份");
                    year = 1901;
                }
            }else if(node.id === "year-post"){
                year++;
                if(year === 2050){
                    alert("请选择2050年以前的年份");
                    year = 2049;
                }
            }else if(node.id === "month-pre"){
                if(month === 1){
                    year--;
                    month = 12;
                }else{
                    month--;
                }
            }else if(node.id === "month-post"){
                if(month === 12){
                    year++;
                    month = 1;
                }else{
                    month++;
                }
            }
            week = new Date(year, month-1, day).getDay();
            monthView();
            displayWeek();
            changeChooser();
        },false);

        //按钮返回现在时间
        btnReturn.addEventListener("click", init,false);

        //表格中td点击事件，对tbody添加事件代理
        table.addEventListener("click", function (event) {
            var node = event.target;
            if(node.tagName === "B" || node.tagName === "SPAN"){
                node = node.parentNode;
            }
            day = Number(node.getElementsByTagName("b")[0].textContent);
            if(node.className.indexOf("pre-month") != -1){
                if( month === 1){
                    year--;
                    month = 12;
                }else{
                    month --;
                }
            }else if(node.className.indexOf("post-month") != -1){
                if(month === 12){
                    year++;
                    month = 1
                }else{
                    month++;
                }
            }
            week = new Date(year, month-1, day).getDay();
            monthView();
            displayWeek();
            changeChooser();
            displayLunar();
        },false);

        initTimeChooser();
        init();

    }
})(window);

