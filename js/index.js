
let selected = []
let calc_values = []
let clear_tables = []
let that; //class Tableに使用

function deflate(val) {
    val = encodeURIComponent(val)
    val = RawDeflate.deflate(val)
    val = btoa(val)
    return val;
}

function inflate(val) {
    val = atob(val)
    val = RawDeflate.inflate(val)
    val = decodeURIComponent(val)
    return val;
}

let audio = {
    select: new Howl({
        src: ['./sounds/select.mp3'],
        loop: false,
        volume: 0.6,
    }),
    fail: new Howl({
        src: ['./sounds/fail.mp3'],
        loop: false,
        volume: 0.5,
    }),
    next: new Howl({
        src: ['./sounds/next.mp3'],
        loop: false,
        volume: 0.5,
    })
}

if (localStorage.hasOwnProperty("clear_tables")) {
    clear_tables = JSON.parse(localStorage.getItem("clear_tables"))
} else {
    clear_tables = []
}


////////////////////////////////////////


function lastSelected() {
    if (selected[selected.length - 1] != undefined) {
        return selected[selected.length - 1]
    } else {
        return { calc_variable: 0 }
    }
}

function clear_tables_update() {
    $(".progress p.number").html(clear_tables.length + `<span>/${stages.length}</span>`)
    $(".progress p.per").html(Math.round(clear_tables.length / stages.length * 100) + `<span>% Clear</span>`)
    if (clear_tables.length >= 32) {
        $(".overlay").hide()
    } else {
        $(".overlay").show()
    }
}

class Table {
    constructor(table_data, option) {
        this.table_data = table_data;
        this.goal_value = 0;
        this.option = option;
    }
    get data() {
        return {
            goal_value: this.goal_value,
            table_data: this.table_data,
            option: this.option
        }
    }

    create() {
        bodyScroll.fixed(true)

        $("dialog.game")[0].showModal()
        $("dialog.game").removeClass("clear")
        $("dialog.game").removeClass("level1 level2 level3")
        $("dialog.game tbody").empty()
        $(document).off()
        $("td").off()

        this.table_data.forEach((array, parent_index) => {
            $(`<tr data-y="${parent_index}"></tr>`).appendTo("dialog.game tbody")
            array.forEach((value, child_index) => {
                let calc_text = value.replace("*", '×').replace("/", '÷')
                $(`<td data-position-x=${child_index} 
                            data-position-y=${parent_index} 
                            data-position-id=${String(child_index) + String(parent_index)}
                            data-calc="${value}"
                            class="sizebox">
                            <div class="box"></div>
                            <p class="box_text">${calc_text}</p>
                        </td>`).appendTo(`tr[data-y="${parent_index}"]`)

                if (value.includes("=")) {
                    $(`td[data-calc="${value}"]`).addClass('goal')
                    this.goal_value = Number(value.replace("=", ""));
                }
                if (value.includes("**")) {
                    $(`td[data-calc="${value}"] p`).text(value.replace("**", "^"))
                }
                if (value.includes("s")) {
                    $(`td[data-calc="${value}"]`).addClass('start')
                    $(`td[data-calc="${value}"] p`).text("")
                    $(`td[data-calc="${value}"]`).data("calc", "")
                }
            })
        })
        that = this;
        //ui
        let dragging;
        let dragging_elements = []

        $(document).on("pointerdown", "td", function () {
            if ($(this).hasClass("start") ||
                (Math.abs(selected.map((obj) => obj.x)[selected.length - 1] - $(this).data("positionX")) +
                    Math.abs(selected.map((obj) => obj.y)[selected.length - 1] - $(this).data("positionY")) <= 1
                ) || selected.map(obj => obj.id).includes(String($(this).data("positionId")))) {
                dragging_elements.push(String($(this).data("positionId")))
                new TableCel(String($(this).data("positionId"))).select()
                that.variable_update();
                dragging = true
            }
        })
        $(document).on("mousemove", "td", function (event) {
            let target = $(document.elementFromPoint(event.clientX, event.clientY))
            if (target.hasClass("sizebox")) {
                if ((Math.abs(selected.map((obj) => obj.x)[selected.length - 1] - $(this).data("positionX")) + Math.abs(selected.map((obj) => obj.y)[selected.length - 1] - $(this).data("positionY")) > 1)) {
                    dragging = false
                } else if (dragging === true) {
                    dragging_elements.push(String(target.data("positionId")))

                    if (dragging_elements[dragging_elements.length - 1] != dragging_elements[dragging_elements.length - 2]) {
                        let positionId = String(target.data("positionId"))
                        new TableCel(positionId).select()
                        that.variable_update()
                    }
                }
            }
        })

        $(document).on("touchmove", "td", function (event) {
            let target = $(document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY))
            if (target.hasClass("sizebox")) {
                if ((Math.abs(selected.map((obj) => obj.x)[selected.length - 1] - target.data("positionX")) + Math.abs(selected.map((obj) => obj.y)[selected.length - 1] - target.data("positionY")) > 1)) {
                    dragging = false
                }
                if (dragging === true) {
                    dragging_elements.push(String(target.data("positionId")))

                    if (dragging_elements[dragging_elements.length - 1] != dragging_elements[dragging_elements.length - 2]) {
                        let positionId = String(target.data("positionId"))
                        new TableCel(positionId).select()
                        that.variable_update()
                    }
                }
            }
        })

        $(document).on("mouseup", "td", function (event) {
            dragging = false
            let target = $(document.elementFromPoint(event.clientX, event.clientY));
            if ((Math.abs(selected.map((obj) => obj.x)[selected.length - 1] - $(this).data("positionX")) + Math.abs(selected.map((obj) => obj.y)[selected.length - 1] - $(this).data("positionY")) <= 1)) {
                if (selected.map(obj => obj.id).includes(String($("td.goal").data("positionId")))) {
                    that.goal()
                }
            }
        })

        $(document).on("touchend", "td", function (event) {
            dragging = false
            let target = $(document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY));
            if ((Math.abs(selected.map((obj) => obj.x)[selected.length - 1] - target.data("positionX")) + Math.abs(selected.map((obj) => obj.y)[selected.length - 1] - target.data("positionY")) <= 1)) {
                if (selected.map(obj => obj.id).includes(String($("td.goal").data("positionId")))) {
                    that.goal()
                }
            }
        })

        $("dialog.game").on("touchend mouseup", function () {
            if (dragging === true && String(selected[selected.length - 1].id) === String($("td.goal").data("positionId"))) {
                that.goal()
            }
            dragging = false
        })

        this.reset()
        this.variable_update(true)
        $(`dialog.game`).addClass('level' + Number(Math.floor((this.goal_value - 1) / 16) + 1))

        if(this.goal_value === 1){ //チュートリアル
            $("dialog.game .hint").show()
        } else {
            $("dialog.game .hint").hide()
        }
    }

    variable_update(noAnimation) {
        if (noAnimation === true) {
            $(".calc_result").empty()
            $(`<span>0</span>`).appendTo(".calc_result")
            $(".show-pannel").hide()
            calc_values.push(0)
            return false
        }
        if (calc_values[calc_values.length - 1] > calc_values[calc_values.length - 2]) {
            $(".calc_result span").each(function (index) {
                $(this).addClass("addition-hide")
            })
            setTimeout(() => {
                $(".calc_result span").remove();
                ((String(Math.round(lastSelected().calc_variable * 1000) / 1000)).split("")).forEach((value, index) => {
                    $(`<span data-digit=${index}>${value}</span>`).appendTo(".calc_result")
                        .addClass("addition-show")
                })
            }, 100)
        }
        if (calc_values[calc_values.length - 1] < calc_values[calc_values.length - 2]) {
            $(".calc_result span").each(function (index) {
                $(this).addClass("reduction-hide")
            })
            setTimeout(() => {
                $(".calc_result span").remove();
                ((String(Math.round(lastSelected().calc_variable * 1000) / 1000)).split("")).forEach((value, index) => {
                    $(`<span data-digit=${index}>${value}</span>`).appendTo(".calc_result")
                        .addClass("reduction-show")

                })
            }, 100)
        }
    }

    reset() {
        $(".box-line").remove()
        $("td").removeClass("enter")
        $("td").removeClass("select")
        selected = []
        new TableCel($(`td.start`).data("positionId")).select()
        this.variable_update()
    }

    fail() {
        $(".box-line").remove()
        $("td").removeClass("select")
        $(".show-panel,table").addClass("fail")
        setTimeout(() => {
            $(".show-panel,table").removeClass("fail")
        }, 500);
        this.variable_update(true)
        selected = []
        new TableCel($(`td.start`).data("positionId")).select()
        audio.fail.play()
        window.navigator.vibrate(100);
    }

    goal() {
        if (this.goal_value === Number(lastSelected().calc_variable) && String(selected[selected.length - 1].id) === String($("td.goal").data("positionId"))) {
            this.clear()
        } else {
            this.fail()
        }
    }

    clear() {
        if (this.option === "share") {
            if (navigator.share) {
                window.navigator.share({
                    title: 'マスmatics',
                    url: 'https://sukepc0824.github.io/masu-matics/created.html?stage=' + deflate(JSON.stringify(this.table_data)),
                })
                    .then(() => console.log('Shared successfully'))
                    .catch((error) => alert("お使いのブラウザーは対応していません。" + error))
            }
            this.reset()
        } else {
            $("dialog.game").addClass("clear")
            if (this.goal_value === 40) { // 40ステージのみの条件分岐
                $("dialog.game button.next").hide()
            } else {
                $("dialog.game button.next").show()
            }
            if (!clear_tables.includes(Number(this.goal_value))) {
                clear_tables.push(Number(this.goal_value))
                localStorage.setItem("clear_tables", JSON.stringify(clear_tables))
                clear_tables_update()
            }
            $(`button.gamestart[value="${this.goal_value}"]`).addClass("clear")
            if (clear_tables.length < 16 && this.goal_value === 32) { // level 3のみ例外処理のための条件分岐
                $("dialog.game button.next").hide()
            } else {
                $("dialog.game button.next").show()
            }
        }
        audio.next.play()
    }
}

class TableCel {
    constructor(id) {
        this.id = id
    }
    select() {
        $(".box-line").remove()
        let $target = $(`td[data-position-id="${this.id}"]`)
        $target.addClass("select")
        if (selected.map(obj => obj.id).includes(this.id)) {
            $(".calc_progress").empty()
            selected.slice(selected.map(obj => obj.id).indexOf(this.id) + 1).forEach(value => {
                new TableCel(value.id).blur()
            })
            selected.splice(selected.map(obj => obj.id).indexOf(this.id) + 1)
        } else {
            if (selected.length != 0) {
                audio.select.play()
            }
            if ($target.hasClass("goal")) {
                selected.push({
                    id: String($target.data("positionId")),
                    x: $target.data("positionX"),
                    y: $target.data("positionY"),
                    formula: $target.text().replace(/\s+/g, ""),
                    calc_variable: eval(`${lastSelected().calc_variable} `)
                })
                $(".calc_progress").empty()
                $(`<p class="show">${selected[selected.length - 1].formula}</p>`).appendTo(".calc_progress")
            } else {
                try {
                    selected.push({
                        id: String($target.data("positionId")),
                        x: $target.data("positionX"),
                        y: $target.data("positionY"),
                        formula: $target.text().replace(/\s+/g, ""),
                        calc_variable: eval(`(${lastSelected().calc_variable})${$(`td[data-position-id="${this.id}"]`).data("calc")}`)
                    })
                } catch {
                    alert("無効なコースです。誤りを確認してください")
                    $("dialog.game")[0].close()
                }
                $(".calc_progress").empty()
                $(`<p>${selected[selected.length - 1].formula}</p>`).appendTo(".calc_progress")
            }
        }
        calc_values.push(lastSelected().calc_variable)
        for (let index = 1; index < selected.length; index++) {
            let $select = $(`td[data-position-id="${selected[index].id}"]`)
            let $select_box = $(`td[data-position-id="${selected[index].id}"] .box`)
            let $pre_select = $(`td[data-position-id="${selected[index - 1].id}"]`)
            let $pre_select_box = $(`td[data-position-id="${selected[index - 1].id}"] .box`)
            if ($select.data("positionX") - $pre_select.data("positionX") === 1) {//→
                $("<div class='box-line'></div>").appendTo("table")
                    .offset({
                        top: $pre_select_box.offset().top,
                        left: $pre_select_box.offset().left + $select_box.width() / 2
                    })
                    .width($pre_select.width())
                    .height($pre_select_box.height())
            }
            if ($select.data("positionX") - $pre_select.data("positionX") === -1) {//←
                $("<div class='box-line'></div>").appendTo("table")
                    .offset({
                        top: $select_box.offset().top,
                        left: $select_box.offset().left + $select_box.width() / 2
                    })
                    .width($pre_select.width())
                    .height($pre_select_box.height())
            }
            if ($select.data("positionY") - $pre_select.data("positionY") === 1) {//↓
                $("<div class='box-line'></div>").appendTo("table")
                    .offset({
                        top: $pre_select_box.offset().top + $select_box.height() / 2,
                        left: $pre_select_box.offset().left
                    })
                    .width($pre_select_box.width())
                    .height($pre_select.height())
            }
            if ($select.data("positionY") - $pre_select.data("positionY") === -1) {//↑
                $("<div class='box-line'></div>").appendTo("table")
                    .offset({
                        top: $select_box.offset().top + $select_box.height() / 2,
                        left: $select_box.offset().left
                    })
                    .width($pre_select_box.width())
                    .height($pre_select.height())
            }
        }
        $("dialog.game .hint").hide()
    }

    blur() {
        $(`td[data-position-id="${this.id}"]`).removeClass("select")
    }
}

stages.forEach((value, index) => {
    $(`<button class="gamestart sizebox" value="${value.goal}">
            <p class="box_text">
                =${value.goal}
            </p>
            </button> `)
        .appendTo(`.container[data-level=${value.level}]`)
})

clear_tables.forEach((value, index) => {
    $(`button.gamestart[value="${value}"]`).addClass("clear")
})

$(`button.gamestart`).on("click", function () {
    table = new Table(
        stages[$(this).val() - 1].table
    )
    table.create()
})

clear_tables_update()

$("button.play").on("click", function () {
    let level = Math.floor(Math.max(0, ...clear_tables) / 16) + 1
    table = new Table(
        stages[Math.min(...[...Array(16).keys()]
            .map(i => i + 16 * (level - 1) + 1)
            .filter(i =>
                clear_tables
                    .map(i => Number(i))
                    .indexOf(i) == -1)) - 1].table
    )
    table.create()
})

$("button.next").on("click", function () {
    table = new Table(
        stages[table.data.goal_value].table
    )
    table.create()
})



// create

for (let index = 0; index < 16; index++) {
    $(`<div data-index=${index} class="sizebox">
   <select id="select">
        <option value=""></option>
        <option value="s">●</option>
        <option value="=">=</option>
        <hr />
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">×</option>
        <option value="/">÷</option>
        <option value="**">^</option>
        <option value="%">%</option>
    </select>
        <input type="number" oninput="javascript: this.value = this.value.slice(0, 2);">
    </div>`).appendTo("dialog.create .action .container")
}

$("dialog.create button.create").on("click", function () {
    let stage = [];
    for (let index = 0; index < $("dialog.create .sizebox").length; index++) {
        stage.push($(`dialog.create .sizebox[data-index=${index}] select`).val() + $(`dialog.create .sizebox[data-index=${index}] input`).val())
    }
    table = new Table([
        [stage[0], stage[1], stage[2], stage[3]],
        [stage[4], stage[5], stage[6], stage[7]],
        [stage[8], stage[9], stage[10], stage[11]],
        [stage[12], stage[13], stage[14], stage[15]],
    ], "share")
    console.log(JSON.stringify(table.table_data))
    table.create()
})

$("form.create").on("reset", function () {
    $(".sizebox select").next().show()
})

$(".sizebox select").on("change", function () {
    if ($(this).val() === "s") {
        $(this).next().hide()
    } else {
        $(this).next().show()
    }
})
