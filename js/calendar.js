var myDate = new Date();
let year = myDate.getFullYear();
let month = myDate.getMonth();
let date = myDate.getDate();
let day = myDate.getDay();
let week = ['日', '一', '二', '三', '四', '五', '六'];
var nowYear = myDate.getFullYear();
var nowMonth = myDate.getMonth();
var nowDate = myDate.getDate();
var nowDay = myDate.getDay();
const month_olypic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//判断闰年
function isLeap(yy) {
    var tem_year = yy;
    if (tem_year % 4 == 0 && tem_year % 100 != 0 || tem_year % 400 == 0) {
        return true;
    } else {
        return false;
    }
}
//判断月份天数
function monthDays(MM, yy) {
    var tem_month = MM;
    var tem_year = yy;
    if (isLeap(tem_year)) {
        return month_olypic[tem_month];
    } else {
        return month_normal[tem_month];
    }
}
//判断第一天是周几
function firstDay(MM, yy, dd = 1) {
    var tem_month = MM;
    var tem_year = yy;
    var tem_day = new Date(year, month, dd);
    return (tmp_day.getDay());
}

$(function () {
    var calendarVue = new Vue({
        el: '#calendar',
        data: {
            month: (month + 1) + '月',
            day: '周' + week[day],
            year: year + '年',
            currentDay: nowDate,
            currentMonth: nowMonth,
            currentYear: nowYear,
            currentWeek: nowDay,
            days: []
        },
        created: function () {
            this.initData(null);
        },
        methods: {
            initData: function (current) {
                var date;
                var temdate;
                this.days = [];

                if (current) {
                    date = new Date(current);
                } else {
                    var now = new Date();
                    var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
                    d.setDate(42);
                    date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                }


                this.currentDay = date.getDate();
                this.currentMonth = date.getMonth() + 1;
                this.currentYear = date.getFullYear();
                this.currentWeek = date.getDay();
                if (current && date.getDate() == 0) {
                    if (monthDays(this.currentMonth, this.currentYear) == 28) {
                        if (this.currentDay == 1 && this.currentWeek == 0) {
                            temdate = 28;
                        } else {
                            temdate = 35;
                        }
                    } else if (monthDays(this.currentMonth, this.currentYear) == 30 && this.currentDay == 1 && this.currentWeek == 6) {
                        temdate = 42;
                    } else if (monthDays(this.currentMonth, this.currentYear) == 31 && this.currentDay == 1 && this.currentWeek == 5) {
                        temdate = 42;
                    } else if (monthDays(this.currentMonth, this.currentYear) == 31 && this.currentDay == 1 && this.currentWeek == 6) {
                        temdate = 42;
                    } else {
                        temdate = 35;
                    }
                } else {
                    if (monthDays(this.currentMonth, this.currentYear) == 28) {
                        if (this.currentDay == 1 && this.currentWeek == 0) {
                            date.setDate(28);
                            temdate = 28;
                        } else {
                            date.setDate(35);
                            temdate = 35;
                        }
                    } else if (monthDays(this.currentMonth, this.currentYear) == 30 && this.currentDay == 1 && this.currentWeek == 6) {
                        date.setDate(42);
                        temdate = 42;
                    } else if (monthDays(this.currentMonth, this.currentYear) == 31 && this.currentDay == 1 && this.currentWeek == 5) {
                        date.setDate(42);
                        temdate = 42;
                    } else if (monthDays(this.currentMonth, this.currentYear) == 31 && this.currentDay == 1 && this.currentWeek == 6) {
                        date.setDate(42);
                        temdate = 42;
                    } else {
                        date.setDate(35);
                        temdate = 35;
                    }

                }
                var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);

                //初始化本周
                for (var i = this.currentWeek; i >= 0; i--) {
                    var d = new Date(str);
                    d.setDate(d.getDate() - i);
                    var dayObject = {};
                    dayObject.day = d;
                    this.days.push(dayObject);
                }
                //其他周
                for (var i = 1; i < temdate - this.currentWeek; i++) {
                    var d = new Date(str);
                    d.setDate(d.getDate() + i);
                    var dayObject = {};
                    dayObject.day = d;
                    this.days.push(dayObject);
                }
                this.$forceUpdate();
            },
            pickPre: function (temyear, temmonth) {
                // setDate(0);//上月最后一天
                // setDate(-1);//上月倒数第二天
                // setDate(dx);//以上月最后一天为基准，前后dx天
                var d = new Date(this.formatDate(temyear, temmonth, 1));
                d.setDate(0);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                // console.log(this.days);
                this.$forceUpdate();
                setTimeout(function () { 
                    var html;
                    html = $('.content').html();
                    $('.previousContent').html(html); 
                }, 1000);
                // this.$nextTick(() => {
                //     var html;
                //     html = $('.content').html();
                //     $('.previousContent').html(html);
                // });
                if(nowMonth+1 == 1) {
                    nowMonth = 11;
                    nowYear -=1;
                }else{
                    nowMonth -= 1;
                } 
            },
            pickNext: function (temyear, temmonth) {
                var d = new Date(this.formatDate(temyear, temmonth, 1));
                d.setDate(35);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
                // console.log(this.days);
                this.$forceUpdate();
                setTimeout(function () { 
                    var html;
                    html = $('.content').html();
                    $('.nextContent').html(html); 
                }, 2000);
                // this.$nextTick(() => {
                //     var html;
                //     html = $('.content').html();
                //     $('.nextContent').html(html);
                // });
                if(nowMonth+1 == 12) {
                    nowMonth = 0;
                    nowYear += 1;
                }else{
                    nowMonth += 1;
                }
            },
            formatDate: function (year, month, day) {
                var y = year;
                var m = month;
                if (m < 10) m = '0' + m;
                var d = day;
                if (d < 10) d = '0' + d;
                return y + '-' + m + '-' + d;
            }
        }
    });

    calendarVue.pickPre(year, month + 1);
    // setTimeout(function () { calendarVue.pickPre(year, month + 1); }, 1000);

    calendarVue.pickNext(year, month + 1);
    // setTimeout(function () { calendarVue.pickNext(year, month + 1); }, 2000);

    setTimeout(function () { year = myDate.getFullYear();month = myDate.getMonth();calendarVue.initData(); }, 3000);

    var mySwiper = new Swiper(".calendarContent", {
        init: 0,
        slidesPerView: "auto",
        initialSlide: 1,
        centeredSlides: !0,
        watchOverflow: !0,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        observeSlideChildren: !0,
        onTouchEnd: function (swiper) {
            // console.log(swiper);
        },
        onTouchEnd: function (swiper) {
            if (swiper.activeIndex == 2) {
                lastSlid();
            }else if (swiper.activeIndex == 0) {
                lastSlid();
            }
            delDecoration();
            console.log(nowMonth+1);
            console.log(nowYear);
        },
    });
    setTimeout(function () { mySwiper.init(); }, 4000);
    //左右滑动处理
    function lastSlid() {
        console.log(mySwiper.swipeDirection);
        if(mySwiper.swipeDirection == 'next') {
            if(mySwiper.activeIndex == 2) {
                mySwiper.slideTo(0);
            }
        }
        if(mySwiper.swipeDirection == 'prev') {
            if(mySwiper.activeIndex == 0) {
                mySwiper.slideTo(2);
            }
        }
    }
    function delDecoration() {
        // console.log($(mySwiper.slides[mySwiper.activeIndex]));
        if(mySwiper.swipeDirection == 'next') {
            if(mySwiper.activeIndex == 2) {
                $(mySwiper.slides[mySwiper.activeIndex]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex-1]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex-2]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).addClass('previousContent');
                $(mySwiper.slides[mySwiper.activeIndex]).prev().addClass('nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).prev().prev().addClass('content');
            } else if(mySwiper.activeIndex == 1) {
                $(mySwiper.slides[mySwiper.activeIndex]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex-1]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex+1]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).addClass('previousContent');
                $(mySwiper.slides[mySwiper.activeIndex]).prev().addClass('content');
                $(mySwiper.slides[mySwiper.activeIndex]).next().addClass('nextContent');
            }else if(mySwiper.activeIndex == 0) {
                $(mySwiper.slides[mySwiper.activeIndex]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex+1]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex+2]).removeClass('previousContent content nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).addClass('previousContent');
                $(mySwiper.slides[mySwiper.activeIndex]).next().next().addClass('nextContent');
                $(mySwiper.slides[mySwiper.activeIndex]).next().addClass('content');
            }
            calendarVue.pickNext(nowYear,nowMonth);
        } else {
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
            }
            calendarVue.pickPre(nowYear,nowMonth);
        }
    }
});