# 可交互时钟

## 使用说明

### 主画面时钟

初始页面为主画面时钟，时钟时间与系统时间默认同步，也可以通过按钮设置时间

##### 设置时间

点击表盘或数字时钟弹出按钮，再次点击后关闭。点击按钮进入时钟时间修改，拖动表针或修改数字时钟设定修改后的时间，点击确定则将时间保存到主画面并返回，否则点击取消不保存更改

### 秒表

点击start开始计时，计时过程中点击stop/continue控制计时暂停/继续，点击reset停止计时并将时间归零。在计时过程中（无论是否暂停）点击record记录时间

### 计时器

##### 设置计时时间

点击表盘或数字时钟进入倒计时时间修改，拖动表针或修改数字时钟设定倒计时时间，点击确定则将时间保存到主画面并返回，否则点击取消不保存更改。若倒计时时间不为0则可以点击start按钮开始计时

##### 计时

计时过程中点击suspend/continue控制计时暂停/继续，点击stop取消计时并将时间归零。计时正常完成时循环播放铃声，点击turn off  alarm停止响铃

### 闹钟

点击add alarm可以设置闹钟事项及时间（精确到分），闹钟建立后可在侧边栏中控制是否开启及删除。当时钟时间与闹钟时间相同时（精确到分）触发响铃，用户只有点击结束响铃才能继续其他操作

### 样式切换

点击右下角change style按钮即可在三种样式中进行1选择并应用于全部表盘

## 代码介绍

### BasicClock

最基础的表盘，其他表盘均在BasicClock的基础上增加功能实现。样式切换作用的对象

输入：时间戳

输出：基础表盘

### DigitalClock

用于显示数字时钟。和以BasicClock为基础的各种表盘进行组合

输入：时间戳

输出：数字时钟

### CombinedClock

BasicClock和DigitalClock的简单组合

### ChangeClock

页面的组件，用于设定该页面时间。

重要组件：BasicClock、 DigitalClock

输入：键鼠操作（拖动表针或在数字时钟中输入）

输出：时间戳。对BasicClock、 DigitalClock进行重渲染

### AutoClock

主画面时钟

重要组件：CombinedClock、 ChangeClock

功能：当showChange变量为假时，时钟自走，具体方案是在上次时钟时间基础上加上两次interval之间主时间（开启页面后经过时间）差值；当其为真时渲染ChangeClock位于顶层且阻断其他操作，如果在ChangeClock中点击确认，将ChangeClock中的时间同步到AutoClock中

### StopWatch

秒表

重要组件：CombinedClock

功能：通过按钮控制状态在['running', 'stopped', 'setting']中切换。running代表运行，stopped代表暂停，setting代表完成。running态下时钟按前述方案走动；不处于setting态时record按钮被渲染，点击可记录当前表盘时间。

### Timer

计时器

重要组件：CombinedClock、 ChangeClock、AlarmAudio

功能：通过按钮与表盘时间控制状态在[‘stopped', 'running', 'suspended', 'alarm']中切换。stopped代表已结束上次响铃，running代表计时中，suspended代表暂停，alarm代表响铃中。stopped态下，可通过之前提到的方法设置倒计时，若倒计时不小于一秒可以开启计时；running态下时钟按照类似之前的方法实现自减（在上次时钟时间基础上减去两次interval之间主时间差值）；当倒计时不大于0时，若alarmOff为假（自上次计时开始后还未完成过响铃），进入alarm态；alarm态下AlarmAudio被激活循环播放闹铃，点击turn off alarm可修改alarmOff并进入stopped态

### Alarm

闹钟

功能：当闹钟可用且其时分均与表盘时间相同时触发响铃

## 组员分工

李乐程: 框架、进度管理、闹钟、秒表、通用组件、SVG数字时钟
季飞言: 通用组件、时钟平滑动画、debug救火
胡梦箫: 计时、时钟平滑动画、按钮样式与效果
王展鹏: 时钟样式及切换逻辑