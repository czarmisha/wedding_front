$(document).ready(function () {
    var last_rel = 80;
    Calculate();

    // $('#BudgetI, #BudgetTables .add, #BudgetTables .brd, #BudgetTables .del, #BudgetTables .descr_p').bind(
    // 	"click",
    // 	function (e) {
    // 		e.stopImmediatePropagation();
    // 		$.magnificPopup.open({
    // 			items: {
    // 				src: '#RegisterWin1'
    // 			},
    // 			type: 'inline',
    // 			preloader: false,
    // 			showCloseBtn: false,
    // 			removalDelay: 300,
    // 			mainClass: 'zoom-in'
    // 		}, 0);
    // 		return false;
    // 	});


    //$( "#Budget tr" ).mouseenter(function() {
    $("body").on("mouseenter", "#Budget tr", function () {
        $("span.del").hide();
        $(this).find('span.del').show();
        $('input.brd').addClass('noborder');
        $(this).find('input.brd').removeClass('noborder');
    });

    $("body").on("focusin", "input.brd", function () {
        $(this).css('opacity', '1');
    });

    $("body").on("focusout", "input.brd", function () {
        if ($(this).val() == '0') $(this).css('opacity', '0.6');
    });

    $("body").on("focusout", "input.name", function () {
        $(this).css('border', '0');
    });

    $("body").on("change", "input.brd", function () {
        source_id = $(this).attr("rel");
        sum = $('input.sum[rel=' + source_id + ']').val();
        if (sum == '') {
            sum = 0;
            $('input.sum[rel=' + source_id + ']').val(sum);
        }
        paid = $('input.paid[rel=' + source_id + ']').val();
        if (paid == '') {
            paid = 0;
            $('input.paid[rel=' + source_id + ']').val(paid);
        }
        // 
        descr = $('textarea.descr[rel=' + source_id + ']').val();
        if (!descr) {
            descr = $('p.descr_p[data=' + source_id + ']').attr('rel');
        }
        if (!descr) descr = '';
        // 
        if (paid > 0 && sum == 0) {
            sum = paid;
            $('input.sum[rel=' + source_id + ']').val(paid);
        }
        if (sum == 0 && paid == 0)
            $('td[rel=' + source_id + ']').html('-');
        else
            $('td[rel=' + source_id + ']').html(sum - paid);
        Calculate();
    });

    //jQuery('input.brd').keyup(function () {
    $("body").on("keyup", "input.brd", function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
        $(this).css('opacity', '1');
    });

    $("body").on("click", "p.descr_p", function () {
        if ($('#txt_tmp').length > 0) {
            source_id_ = $('#txt_tmp').attr("rel");
            sum_ = $('input.sum[rel=' + source_id_ + ']').val();
            paid_ = $('input.paid[rel=' + source_id_ + ']').val();
            descr_ = $('textarea.descr[rel=' + source_id_ + ']').val();
            if (!descr_) {
                descr_ = $('p.descr_p[data=' + source_id_ + ']').attr('rel');
            }
            if (!descr_) descr_ = '';
            if (paid_ > 0 && sum_ == 0) {
                sum_ = paid_;
                $('input.sum[rel=' + source_id_ + ']').val(paid_);
            }

            if (sum_ == 0 && paid_ == 0)
                $('td[rel=' + source_id_ + ']').html('-');
            else
                $('td[rel=' + source_id_ + ']').html(sum_ - paid_);
            if (descr_.length > 60)
                var dscr_short_ = descr_.substr(0, 60) + '...<span class="more"></span>';
            else
                dscr_short_ = descr_;
            $("#txt_tmp").parents('td div').html('<p class="descr_p" rel="' + descr_ +
                '" data="' + source_id_ + '">' + dscr_short_ + '</p>');
            Calculate();

        } else {
            text = $(this).attr("rel");
            source_id = $(this).attr("data");
            $(this).parent('td div').html('<textarea id="txt_tmp" name="" class="descr" rel="' +
                source_id + '" placeholder="Новая заметка">' + text + '</textarea>');
            $('textarea.descr[rel=' + source_id + ']').height(1);
            $('textarea.descr[rel=' + source_id + ']').height(document.getElementById('txt_tmp')
                .scrollHeight - 20);
        }
    });

    $("body").on("keydown", "#txt_tmp", function () {
        $('#txt_tmp').height(document.getElementById('txt_tmp').scrollHeight - 20);
    });

    /*$(document).on('mousedown', '*:not(textarea.descr)', function() {
        if ($("#txt_tmp").length>0){
            source_id = $("#txt_tmp").attr("rel");
            sum = $('input.sum[rel='+source_id+']').val();
            paid = $('input.paid[rel='+source_id+']').val();
            dscr = $('#txt_tmp').val();
            $.post(baseUrl+'ajax/UpdateBudgetRow', { source_id: source_id, sum: sum, paid: paid, dscr: dscr },function() {
                $('td[rel='+source_id+']').html(sum-paid);
                $("#txt_tmp").parents('td div').html('<p class="descr_p" rel="'+dscr+'" data="'+source_id+'">'+dscr+'<span class="more"></span></p>');
            });
        }
    });*/

    $("body").click(function (e) {
        if (!$(e.target).hasClass('descr') && !$(e.target).hasClass('more') && !$(e.target).hasClass(
                'descr_p')) {
            if ($("#txt_tmp").length > 0) {
                source_id = $("#txt_tmp").attr("rel");
                sum_ = $('input.sum[rel=' + source_id + ']').val();
                paid_ = $('input.paid[rel=' + source_id + ']').val();
                descr = $('#txt_tmp').val();
                
                if (descr.length > 60){
                    var dscr_short = descr.substr(0, 60) +
                    '...<span class="more"></span>';
                }
                else
                    dscr_short = descr;
                $("#txt_tmp").parents('td div').html('<p class="descr_p" rel="' + descr +
                    '" data="' + source_id + '">' + dscr_short + '</p>');
                Calculate();
            }
        }
    });

    // $("body").on("change", "textarea.descr", function () {
    //     source_id = $(this).attr("rel");
    //     descr = $('textarea.descr[rel=' + source_id + ']').val();
    //     sum = $('input.sum[rel=' + source_id + ']').val();
    //     paid = $('input.paid[rel=' + source_id + ']').val();
    //     descr = $('p[data=' + source_id + ']').attr('rel');
     

    //     // Calculate();

    // });

    $("body").on("change", "input.name", function () {
        source_id_ = $(this).attr("rel");
        sum_ = $('input.sum[rel=' + source_id_ + ']').val();
        paid_ = $('input.paid[rel=' + source_id_ + ']').val();
        name_ = $('input.name[rel=' + source_id_ + ']').val();
        if (sum_ == 0 && paid_ == 0)
            $('td[rel=' + source_id_ + ']').html('-');
        else
            $('td[rel=' + source_id_ + ']').html(sum_ - paid_);
            Calculate();
    });

    $("#BudgetI").change(function () {
        s = $(this).val();
        $('#BudgetRest').html(s-$('#BudgetSpending').val());
        Calculate();
    });
    $("body").on("keyup", "#BudgetI", function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
        $(this).css('opacity', '1');
    });

    //$("input[type=text]").keyup( function( event )
    // $("body").on("keyup", "input[type=text]", function () {
    //     if (event.keyCode == 13 || (event.ctrlKey && event.keyCode == 13)) {
    //         source_id_ = $(this).attr("rel");
    //         descr_ = $('textarea.descr[rel=' + source_id_ + ']').val();
    //         sum_ = $('input.sum[rel=' + source_id_ + ']').val();
    //         paid_ = $('input.paid[rel=' + source_id_ + ']').val();
    //         descr_ = $('p[data=' + source_id_ + ']').attr('rel');
    //         $.post(baseUrl + 'ajax/UpdateBudgetRow', {
    //             source_id: source_id_,
    //             sum: sum_,
    //             paid: paid_,
    //             descr: descr_
    //         }, function () {
    //             if (sum_ == 0 && paid_ == 0)
    //                 $('td[rel=' + source_id_ + ']').html('-');
    //             else
    //                 $('td[rel=' + source_id_ + ']').html(sum_ - paid_);
    //             //Calculate();
    //         });

    //         //$(this).change();
    //         $(this).blur();
    //     }
    // });

    $("#Budget tr span.add").click(function () {
        s = $(this);
        tr = $(this).parents("tr");
        parent_id = $(this).parents("table").attr('rel');
        s.parents("table").find('tr:first').after('<tr rel="' + last_rel + '" data="' +
            parent_id + '">' +
            '<td><span class="del" rel="' + last_rel +
            '" title="удалить строку"></span><input type="text" class="name"  rel="' +
            last_rel + '" /></td>' +
            '<td><input type="text" name="" value="0" class="brd sum noborder" rel="' +
            last_rel + '"></td>' +
            '<td><input type="text" name="" value="0" class="brd paid noborder" rel="' +
            last_rel + '"></td>' +
            '<td rel="' + last_rel + '">-</td>' +
            //'<td><textarea name="" class="descr" rel="'+last_rel+'"></textarea></td>'+
            '<td class="bgc"><div><p class="descr_p" rel="" data="' + last_rel + '"></p></div></td>' +
            '</tr>')
        Calculate();
        last_rel++;
        $('input[rel="' + last_rel + '"]:eq(0)').focus();

    });

    //$("input[type='text']").on("click", function () {
    $("body").on("click", "input[type='text']", function () {
        $(this).select();
    });

    $('body').on('click', 'span.del', function () {
    //    popup
        if($('.DeleteBlock').css('display') == 'none'){
            $('.DeleteBlock').css('display', 'block');
            $('.DeleteBlock').css('top', window.pageYOffset);
            $('body').css('overflow', 'hidden');
        }
        else{
            $('.DeleteBlock').css('display', 'none');
            $('body').css('overflow', 'auto');
        }
        
        tr = $(this).parent("td").parent("tr");
        parent_id = tr.attr("data");
        source_id = $(this).attr("rel");
        $('#Yes').attr('rel', $(this).attr('rel'));
        $('#Yes').attr('data', source_id);
        $('#Yes').attr('data-rel', parent_id);
        $(this).attr('rel')
        return false;
    });

    $('span#Yes').on('click', function () {
        source_id = $('#Yes').attr('data');
        parent_id = $('#Yes').attr('data-rel');
        tr = $('tr[rel="' + source_id + '"]');
            tr.remove();
            if($('.DeleteBlock').css('display') == 'block'){
                $('.DeleteBlock').css('display', 'none');
                $('body').css('overflow', 'auto');
            }
            Calculate();
        return false;
    });

    $('span#No').on('click', function () {
        if($('.DeleteBlock').css('display') == 'block'){
            $('.DeleteBlock').css('display', 'none');
            $('body').css('overflow', 'auto');
        }
        return false;
    });

    $('.save').on('click', function (e) {
        e.preventDefault();
        SaveJSON();
        // SaveAll(); ajax post to save im db
    })

});

function SaveJSON() {
    let budget = $('#BudgetI').val();
    let json = [];
    $("#BudgetTables table").each(function (index) {
        let obj = {};
        let rows = [];
        obj.rel = $(this).attr('rel');
        obj.table_name = $(this).find('.table_name').attr('table_name');
        $("tr", $(this)).each(function (index) {
            let object = {};
            if(index != 0){
                object.name = $(this).find('.row_name').attr('row_name');
                object.rel = $(this).attr('rel');
                object.data = $(this).attr('data');
                object.sum = $(this).find('.sum').length == 1 ? $(this).find('.sum').val() : 0;
                object.paid = $(this).find('.paid').length == 1 ? $(this).find('.paid').val() : 0;
                object.diff = $(this).find('.diff').length == 1 ? $(this).find('.diff').text() : '-';
                object.descr_p = {
                    'rel': $(this).find('.descr_p').attr('rel'),
                    'data': $(this).find('.descr_p').attr('data'),
                    'text': $(this).find('.descr_p').text(),
                };
            rows.push(object)    
            }
        });
        obj.rows = rows;
        json.push(obj);
    });
    console.log(json);
    // console.log(budget);
    // console.log(last_rel);
}

function Calculate() {
    t_sum = 0;
    t_paid = 0;

    $("input.brd").each(function (index) {
        if ($(this).val() == 0) $(this).css('opacity', '0.6');
        else $(this).css('opacity', '1');
    });

    $("#BudgetTables table").each(function (index) {
        sum = 0;
        $("input.sum", $(this)).each(function (index) {
            sum = sum + parseInt($(this).val());
        });

        paid = 0;
        $("input.paid", $(this)).each(function (index) {
            paid = paid + parseInt($(this).val());
        });

        $(this).find(".block_foot td:eq(1)").text(sum);
        $(this).find(".block_foot td:eq(2)").text(paid);
        if (sum == 0 && paid == 0)
            r = '-';
        else
            r = sum - paid;
        $(this).find(".block_foot td:eq(3)").text(r);

        t_sum += sum;
        t_paid += paid;
    });

    /*$( "input.sum" ).each(function( index ) {
          sum = sum + parseInt($( this ).val());
    });*/


    /*paid = 0;
    $( "input.paid" ).each(function( index ) {
          paid = paid + parseInt($( this ).val());
    });*/

    $('#BudgetSpending').html(t_sum);
    $('#BudgetPaid').html(t_paid);
    $('#BudgetUnpaid').html(t_sum - t_paid);
    budget = parseInt($('#BudgetI').val());

    $('#BudgetRest').html(budget - t_sum);
}