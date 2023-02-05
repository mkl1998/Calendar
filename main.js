window.addEventListener('load',function(){
    // 判断是否是闰年
function isLeap(year) {
    if((year%4==0 && year%100!=0) || year%400==0){
        return true
    }else{
        return false
    }
}

// 数组存储每个月的天数
var monthDay=[31,0,31,30,31,30,31,31,30,31,30,31]

// 判断是星期几
function whatDay(year,month,day=1) {
    var sum=0
    sum+=(year-1)*365+Math.floor((year-1)/4)-Math.floor((year-1)/100)+Math.floor((year-1)/400)+day
    for(var i=0;i<month-1;i++){
        sum+=monthDay[i]
    }
    if(month>2){
        if(isLeap(year)){
            sum+=29
        }else{
            sum+=28
        }
    }
    console.log(sum%7)
    return sum%7
}

// 显示日历
function showCal(year,month,firstday){
    var i
    var tagClass=''
    var nowDate=new Date()
    var days  //月天数

    if(month==2){
        if(isLeap(year)){
            days=29
        }else{
            days=28
        }
    }else{
        days=monthDay[month-1]
    }

    // 当前月份添加至顶部
    var topDateHtml=year+'年'+month+'月'
    var topDate=document.querySelector('.topDate')
    topDate.innerHTML=topDateHtml

    // 日期
    var tbodyHtml='<tr>'
    // 1号前用空白格填充
    for(i=0;i<firstday;i++){
        tbodyHtml+='<td></td>'
    }
    var changeLine=firstday
    // 将日期填充到表格内
    for(i=1;i<=days;i++){
        if(year==nowDate.getFullYear() && month==nowDate.getMonth()+1 && i==nowDate.getDate()){
            tagClass='curDate'  //当前日期
        }else{
            tagClass='isDate'
        }
        tbodyHtml+='<td class='+tagClass+'>'+i+'</td>'
        changeLine=(changeLine+1)%7
        // 判断填充是否需要换行
        if(changeLine==0 && i!=days){
            tbodyHtml+='<tr></tr>'
        }
    }
    if(changeLine!=0){
        for(i=changeLine;i<7;i++){
            tbodyHtml+='<td></td>'
        }
    }
    tbodyHtml+='</tr>'
    var tbody=document.querySelector('.tbody')
    tbody.innerHTML=tbodyHtml
}

var curDate=new Date()
var curYear=curDate.getFullYear()
var curMonth=curDate.getMonth()+1
showCal(curYear,curMonth,whatDay(curYear,curMonth))

function nextMonth(){
    var topStr=document.querySelector('.topDate').innerHTML
    // 获取字符串中的数字
    var pattern=/\d+/g
    var yearAndMonth=topStr.match(pattern)
    // 获取年月
    var year=yearAndMonth[0]
    var month=yearAndMonth[1]
    month=parseInt(month)
    var nextMonth=month+1
    if(nextMonth>12){
        nextMonth=1
        year++
    }
    document.querySelector('.topDate'),innerHTML=''
    showCal(year,nextMonth,whatDay(year,nextMonth))
}

function preMonth(){
    var topStr=document.querySelector('.topDate').innerHTML
    var pattern=/\d+/g
    var yearAndMonth=topStr.match(pattern)
    var year=yearAndMonth[0]
    var month=yearAndMonth[1]
    month=parseInt(month)
    var preMonth=month-1
    if(preMonth<1){
        preMonth=12
        year--
    }
    document.querySelector('.topDate').innerHTML=''
    showCal(year,preMonth,whatDay(year,preMonth))
}

this.document.querySelector('.left').onclick=function(){
    preMonth()
}
this.document.querySelector('.right').onclick=function(){
    nextMonth()
}
})