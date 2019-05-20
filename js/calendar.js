var myDate = new Date();
let year = myDate.getFullYear();
let month = myDate.getMonth();
let date = myDate.getDate();
let day = myDate.getDay();
let week = ['日', '一', '二', '三', '四', '五', '六'];
const nowYear = myDate.getFullYear();
const nowMonth = myDate.getMonth();
const nowDate = myDate.getDate();
const nowDay = myDate.getDay();
const month_olypic = [31,29,31,30,31,30,31,31,30,31,30,31];
const month_normal = [31,28,31,30,31,30,31,31,30,31,30,31];
//判断闰年
function isLeap(yy) {
    var tem_year = yy;
    if(tem_year%4==0 && tem_year%100!=0 || tem_year%400==0) {
        return true;
    } else {
        return false;
    }
}
//判断月份天数
function monthDays(MM, yy) {
    var tem_month = MM;
    var tem_year = yy;
    if(isLeap(tem_year)) {
        return month_olypic[tem_month];
    }else {
        return month_normal[tem_month];
    }
}
//判断第一天是周几
function firstDay(MM, yy, dd=1) {
    var tem_month = MM;
    var tem_year = yy;
    var tem_day = new Date(year, month, dd);
    return (tmp_day.getDay());
}
$(function() {
    var calendarVue =new Vue({
        el:'#calendar',
        data:{
            month:(month+1) + '月',
            day:'周' + week[day],
            year:year + '年',
            currentDay:nowDate,
            currentMonth:nowMonth,
            currentYear:nowYear,
            currentWeek:nowDay,
            days:[]
        },
        created: function() {
            this.initData(null);
        },
        methods: {
            initData: function(current) {
                var tem_date;

                if(current) {
                    tem_date = new Date(current);
                } else {
                    var now = new Date();
                    var d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));
                    d.setDate(35);
                    date = new Date(this.formatDate(d.getFullYear() , d.getMonth()+1,1));
                }
                this.currentDay = date.getDate();
                this.currentMonth = date.getMonth()+1;
                this.currentYear = date.getFullYear();

                this.currentWeek = date.getDay();
                //判断周日
                if(this.currentWeek == 0) {
                    this.currentWeek = 7;
                }
                var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
                this.days.length = 0;
                //周日放第一行第7个位置
                //初始化本周
                for(var i = this.currentWeek;i > 0;i--) {
                    var d = new Date(str);
                    d.setDate(d.getDate() - i);
                    var dayObject = {};
                    dayObject.day = d;
                    this.days.push(dayObject);
                }
                //其他周
                for(var i = 0;i < 35-this.currentWeek;i++) {
                    var d = new Date(str);
                    d.setDate(d.getDate() + i);
                    var dayObject = {};
                    dayObject.day = d;
                    this.days.push(dayObject);
                }
            },
            pickPre: function(year, month) {
                // setDate(0);//上月最后一天
                // setDate(-1);//上月倒数第二天
                // setDate(dx);//以上月最后一天为基准，前后dx天
                var d = new Date(this.formatDate(year, month, 1));
                d.setDate(0);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth()+1, 1));
            },
            pickNext: function(year, month) {
                var d = new Date(this.formatDate(year, month, 1));
                d.setDate(35);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth()+1, 1));
            },
            formatDate: function(year, month, day) {
                var y = year;
                var m = month;
                if(m < 10) m = '0' + m;
                var d = day;
                if(d < 10) d = '0' + d;
                return y+'-'+m+'-'+d;
            }
        }
    });
});