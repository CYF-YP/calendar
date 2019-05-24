var myDate = new Date();
const nowYear = myDate.getFullYear();
const nowMonth = myDate.getMonth(); //0-11
const nowDate = myDate.getDate(); //1-31
const nowDay = myDate.getDay(); //0-6
let year = myDate.getFullYear();
let month = myDate.getMonth();
let date = myDate.getDate();
let day  = myDate.getDay();
let week = ['日', '一', '二', '三', '四', '五', '六'];

//判断闰年
function isLeap(temyear) {
    var tem_year = temyear;
    if(tem_year % 4 == 0 && tem_year % 100 != 0 || tem_year % 400 ==0) {
        return true;
    }else {
        return false;
    }
}

//判断当月天数1-31
function getMonthData(temyear, temmonth) {
    var countDays = new Date(temyear, temmonth, 0).getDate();
    return countDays;
}

//判断当日周数0-6
function getDayData(temyear, temmonth, temdate = 1) {
    var countDay = new Date(temyear, temmonth, temdate).getDay();
    return countDay;
}

//判断当月周数(未%7)
function getWeekDada(temyear, temmonth, temdate = 1) {
    var countWeeks = getDayData(temyear, temmonth, temdate) + getMonthData(temyear, temmonth+1);
    return countWeeks;
}

$(function(){
    var calendarVue = new Vue({
        el: '#calendar',
        data: {
            year: year,
            month: month,
            date: date,
            day: week[day],
            currentDay: nowDate,
            currentMonth: nowMonth,
            currentYear: nowYear,
            currentWeek: nowDay,
            days:[]
        },
        created: function() {
            this.initData(null);
        },
        methods: {
            initData: function(current) {
                var data;
                this.days = [];

                if(current) {
                    data = new Date(current);
                }else {
                    var now = new Date();
                    data = new Date(this.formatDate(now.getFullYear(), now.getMonth()+1, now.getDate()));
                }
                
                // 初始化
                var firstDay = getDayData(data.getFullYear(), data.getMonth(), 1);
                var monthDays = getMonthData(data.getFullYear(), data.getMonth()+1);
                var allMonthDays = getWeekDada(data.getFullYear(), data.getMonth(), 1);
                var str = this.formatDate(data.getFullYear(), data.getMonth()+1, 1);
                // 上月
                for(let i = firstDay; i > 0; i--) {
                    var temData = new Date(str);
                    temData.setDate(1-i);
                    var dayObject = {};
                    dayObject.day = temData;
                    this.days.push(dayObject);
                }
                // 本月
                for(let i = 1; i <= monthDays; i++) {
                    var temData = new Date(str);
                    temData.setDate(i);
                    var dayObject = {};
                    dayObject.day = temData;
                    this.days.push(dayObject);
                }
                // 下月
                for(let i = allMonthDays;i < Math.ceil(allMonthDays / 7)*7; i++) {
                    var temData = new Date(str);
                    temData.setDate(++monthDays);
                    var dayObject = {};
                    dayObject.day = temData;
                    this.days.push(dayObject);
                }
            },
            pickPre: function() {
                var temyear = this.year;
                var temmonth = this.month;
                temmonth -= 1;
                month -= 1;
                if(temmonth-1<0) {
                    temmonth = 11;
                    temyear = temyear-1;
                    month = 11;
                    year -= 1;
                }
                var data = new Date(this.formatDate(temyear, temmonth, 1));
                this.initData(data);
            },
            pickNext: function() {
                var temyear = this.year;
                var temmonth = this.month;
                temmonth += 1;
                month +=1
                if(temmonth>11) {
                    temmonth = 0;
                    temyear = temyear+1;
                    month = 0;
                    year += 1;
                }
                var data = new Date(this.formatDate(temyear, temmonth, 1));
                this.initData(data);
            },
            formatDate: function(temyear, temmonth, temday) {
                var y = temyear;
                var m = temmonth;
                var d = temday;
                if(m < 10) m = '0' + m;
                if(d < 10) d = '0' + d;
                return y + '-' + m + '-' + d;
            },
        },
    });
    var mySwiper = new Swiper(".calendarContent", {
        slidesPerView: "auto",
        initialSlide: 1,
        centeredSlides: !0,
        watchOverflow: !0,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        observeSlideChildren: !0,
        shortSwipes : !0,
        onTouchEnd: function (swiper) {
            delDecoration();
        },
    });

    // 处理滑动问题，topbar时间需要跟随改变
    function delDecoration() {
        if(mySwiper.swipeDirection == 'next') {
            if(mySwiper.activeIndex == 2) {
                $(mySwiper.slides[mySwiper.activeIndex]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex-1]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex-2]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).addClass('previousContent');
                $(mySwiper.slides[mySwiper.activeIndex]).prev().addClass('nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).prev().prev().addClass('content');
                mySwiper.slideTo(0);
            } else if(mySwiper.activeIndex == 1) {
                $(mySwiper.slides[mySwiper.activeIndex]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex-1]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex+1]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).addClass('previousContent');
                $(mySwiper.slides[mySwiper.activeIndex]).prev().addClass('nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).next().addClass('content');
            }else if(mySwiper.activeIndex == 0) {
                $(mySwiper.slides[mySwiper.activeIndex]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex+1]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex+2]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).addClass('previousContent');
                $(mySwiper.slides[mySwiper.activeIndex]).next().next().addClass('nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).next().addClass('content');
            }
            calendarVue.pickNext(year,month);
        }else {
            if(mySwiper.activeIndex == 2) {
                $(mySwiper.slides[mySwiper.activeIndex]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex-1]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex-2]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).addClass('nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).prev().addClass('content');
                $(mySwiper.slides[mySwiper.activeIndex]).prev().prev().addClass('previousContent');
            } else if(mySwiper.activeIndex == 1) {
                $(mySwiper.slides[mySwiper.activeIndex]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex-1]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex+1]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).addClass('nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).prev().addClass('content');
                $(mySwiper.slides[mySwiper.activeIndex]).next().addClass('previousContent');
            }else if(mySwiper.activeIndex == 0) {
                $(mySwiper.slides[mySwiper.activeIndex]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex+1]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex+2]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).addClass('nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).next().next().addClass('content');
                $(mySwiper.slides[mySwiper.activeIndex]).next().addClass('previousContent');
                mySwiper.slideTo(2);
            }
            calendarVue.pickPre(year,month);
        }
    }
});