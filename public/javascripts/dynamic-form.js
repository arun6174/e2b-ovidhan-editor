var bnChCons = ['ক','খ','গ','ঘ','ঙ','চ','ছ','জ','ঝ','ঞ','ট','ঠ','ড','ঢ','ণ','ত','থ','দ','ধ','ন','প','ফ','ব','ভ','ম','য','র','ল','শ','ষ','স','হ','ড়','ঢ়','য়','ৎ'];
var bnChVows = ['অ','আ','ই','ঈ','উ','ঊ','ঋ','এ','ঐ','ও','ঔ'];
var bnNums = ['১','২','৩','৪','৫','৬','৭','৮','৯','১০','১১','১২','১৩','১৪','১৫','১৬','১৭','১৮','১৯','২০','২১','২২','২৩','২৪','২৫','২৬','২৭','২৮','২৯','৩০','৩১','৩২','৩৩','৩৪','৩৫','৩৬','৩৭','৩৮','৩৯','৪০','৪১','৪২','৪৩','৪৪','৪৫','৪৬','৪৭','৪৮','৪৯','৫০'];
var usageCntr = 0;
var meaningCntr = 0;
var subMeaningCntr = 0;
var posCntr = 0;
var phraseCntr = 0;


$( document ).ready(function() {
    console.log( "ready!" );

    // var elems = document.querySelectorAll('.check-box');
    // var btn = document.querySelector('.btn-elem');
    // [].forEach.call(elems, function(el) {
    // el.addEventListener('change', function() {
    //     var checked = document.querySelectorAll('.check-box:checked');
    //     if (checked.length) {
    //         // btn.style.backgroundColor = 'green';
    //         $(this).closest('.btn-elem').style.backgroundColor = 'green';
    //     } else {
    //         // btn.style.backgroundColor = '';
    //         $(this).closest('.btn-elem').style.backgroundColor = '';
    //     }
    // });
    // });
});

$(function () {

    $(".chkClsButtonGrp").change(function() {
        if (this.checked) {
            this.closest('.btnClsCheckbox').style.backgroundColor = '#f0ad4e';//'#5cb85c';
            $(this).siblings('i').first().removeClass('fa-plus').addClass('fa-times-circle');
            if (this.name == 'phrases') {
                addPhraseSection(this.id);
            } else if (this.name == 'phrasalVerbs') {
                addPhrasalVerbSection(this.id);
            } else if (this.name == 'compoundWords') {
                addCompoundWordSection(this.id);
            } else {
                addDerivativeSection(this.id);
            }
        } else {
            this.closest('.btnClsCheckbox').style.backgroundColor = '';
            $(this).siblings('i').first().removeClass('fa-times-circle').addClass('fa-plus');
            if (this.name == 'phrases') {
                removePhraseSection(this.id);
            } else if (this.name == 'phrasalVerbs') {
                removePhrasalVerbSection(this.id);
            } else if (this.name == 'compoundWords') {
                removeCompoundWordSection(this.id);
            } else {
                removeDerivativeSection(this.id);
            }
        }
    });

    $('.selectpicker.clsSelectPos').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
        // console.log($(this).val());
        // console.log($(e.currentTarget).val());
        // console.log($(this).prop('id'));
        // console.log(newValue, oldValue);
        if ($(this).val() == "noun") {
            if ($("#divVerb_"+1).length > 0) {
                $("#divVerb_"+1).remove();
            } else if ($("#divAdj_"+1).length > 0) {
                $("#divAdj_"+1).remove();
            }
            if($("#divNoun_" + posCntr).length == 0) {
                var newSP = $('#selectNounType').clone();
                newSP.prop('id', 'selectNounType_' + posCntr);
                newSP.removeClass('hide');

                var clone = $('#divNoun').clone();
                clone.find("#inpPlural").first().prop("id", "inpPlural_" + posCntr);
                clone.find("#selectNounType").first().prop('id', 'selectNounType_' + posCntr);
                clone
                    .hide()
                    .removeClass('hide')
                    .attr('id', 'divNoun_' + posCntr)
                    .appendTo("#divPosDetails")
                    .show('fast');
                newSP.appendTo(clone.closest('.divClsNoun'));
                newSP.selectpicker('refresh');
            }
        } else if ($(this).val() == "verb") {
            if ($("#divNoun_"+1).length > 0) {
                $("#divNoun_"+1).remove();
            } else if ($("#divAdj_"+1).length > 0) {
                $("#divAdj_"+1).remove();
            }
            if($("#divVerb_" + posCntr).length == 0) {
                var newSP = $('#selectVerbType').clone();
                newSP.prop('id', 'selectVerbType_' + posCntr);
                newSP.removeClass('hide');

                var clone = $('#divVerb').clone();
                clone.find("#inp3rdPerson").first().prop("id", "inp3rdPerson_" + posCntr);
                clone.find("#inpPresentCont").first().prop("id", "inpPresentCont_" + posCntr);
                clone.find("#inpPast").first().prop("id", "inpPast_" + posCntr);
                clone.find("#inpPastPart").first().prop("id", "inpPastPart_" + posCntr);
                clone
                    .hide()
                    .removeClass('hide')
                    .attr('id', 'divVerb_' + posCntr)
                    .appendTo("#divPosDetails")
                    .show('fast');
                newSP.appendTo(clone.find('.divClsType').first());
                newSP.selectpicker('refresh');
            }
        } else if ($(this).val() == "adj") {
            if ($("#divNoun_"+1).length > 0) {
                $("#divNoun_"+1).remove();
            } else if ($("#divVerb_"+1).length > 0) {
                $("#divVerb_"+1).remove();
            }
            if($("#divAdj_" + posCntr).length == 0) {
                var clone = $('#divAdj').clone();
                clone.find("#inpComparative").first().prop("id", "inpComparative_" + posCntr);
                clone.find("#inpSuperlative").first().prop("id", "inpSuperlative_" + posCntr);
                clone
                    .hide()
                    .removeClass('hide')
                    .attr('id', 'divAdj_' + posCntr)
                    .appendTo("#divPosDetails")
                    .show('fast');
            }
        } else {
            if ($("#divNoun_"+1).length > 0) {
                $("#divNoun_"+1).hide('fast', function(){ $(this).remove(); });
            } else if ($("#divVerb_"+1).length > 0) {
                $("#divVerb_"+1).hide('fast', function(){ $(this).remove(); });
            } else if ($("#divAdj_"+1).length > 0) {
                $("#divAdj_"+1).hide('fast', function(){ $(this).remove(); });
            }
        }
        
        // if($(this).attr('name')=="name2"){
        //     $(".selectpicker[name='name1']").val(/*set value*/);
        // }
        // else{
        //     $(".selectpicker[name='name2']").val(/*set value*/);
        // }
    });
});

function addUsage(buttonId) {

};

function addPhraseSection(buttonId) {
    var parentDivUsageId = document.getElementById(buttonId).closest('.divClsUsage').id;
    // console.log(parentDivUsageId);
    // console.log($('#'+parentDivUsageId).data('index'));
    
    // var divTargetId = $('#'+button.closest('.divClsUsage').id).find('#divPhrasesPlaceholder');
    // console.log(buttonId);
    // console.log(divTargetId);
    // phraseCntr++;
    // var divPhrases = $('#divPhrases').clone();
    // divPhrases.find("#divContainerPhrases").first().prop("id", "divContainerPhrases_" + usageCntr);

    // var divIndivPhrase = $('#divPhrase').clone();
    // divIndivPhrase.find('label').text(phraseCntr + ' &nbsp; Phrase');
    // divIndivPhrase.find("#inpPhrase").first().prop("id", "inpPhrase_" + phraseCntr);
    
    // divIndivPhrase
    //     .hide()
    //     .removeClass('hide')
    //     .attr('id', '#divPhrase_' + phraseCntr)
    //     .appendTo('divContainerPhrases_' + usageCntr);

    // divPhrases
    //     .hide()
    //     .removeClass('hide')
    //     .attr('id', '#divPhrase_' + usageCntr)
    //     .appendTo('#divPhrasesPlaceholder_'+usageCntr)
    //     show('fast');
};

function removePhraseSection(buttonId) {
    var divId = document.getElementById(buttonId).closest(".divClsUsge").find('.divClsPhrases').first().id;
    $("#"+divId).hide('fast', function(){ $("#"+divId).remove(); });
    phraseCntr = 0;
}

function addMorePhrase(buttonId) {
    phraseCntr++;
    var divIndivPhrase = $('#divPhrase').clone();
    divIndivPhrase.find('label').text(phraseCntr + ' &nbsp; Phrase');
    divIndivPhrase.find("#inpPhrase").first().prop("id", "inpPhrase_" + phraseCntr);
    
    divIndivPhrase
        .hide()
        .removeClass('hide')
        .attr('id', '#divPhrase_' + phraseCntr)
        .appendTo('divContainerPhrases_' + usageCntr);
};

function removePhrase(buttonId) {
    var divId = document.getElementById(buttonId).closest(".divClsPhrase").id;
    $("#"+divId).hide('fast', function(){ $("#"+divId).remove(); });
    phraseCntr = 0;
}

function addMeaning(buttonId) {
    var button = document.getElementById(buttonId);
    var rootDivId = button.closest('.divClsPos').id;
    console.log(buttonId);
    console.log(rootDivId);
    var clone = $('#divMeaning').clone();
    clone.find("#inpMeaning").first().prop("id", "inpMeaning_" + meaningCntr);
    clone.find("#inpExample").first().prop('id', 'inpExample_' + meaningCntr);
    clone.find('button').prop('id', 'btnAddSubMeaning_' + meaningCntr);
    clone
        .hide()
        .removeClass('hide')
        .attr('id', 'divMeaning_' + meaningCntr)
        // .insertAfter("div."+rootDivId+":last");
        .insertBefore(button)
        // .appendTo("#divMeaningContainer")
        .show('fast');

    meaningCntr++;
};

function removeMeaning(buttonId) {
    // document.getElementById(objId).remove();
    var divId = document.getElementById(buttonId).closest(".divClsMeaning").id;
    console.log(divId);
    // document.getElementById(buttonId).closest(".divClsMeaning").remove();
    $("#"+divId).hide('fast', function(){ $("#"+divId).remove(); });
    meaningCntr--;
};

function addSubMeaning(buttonId) {
    var button = document.getElementById(buttonId);
    var rootDivId = button.closest('.divClsMeaning').id;

    console.log(buttonId);
    console.log(rootDivId);
    // var obj = $('#divSubMeaning').find("#subMeaning").first().prop("id");
    // console.log(obj);

    var clone = $('#divSubMeaning').clone();
    clone.find("#inpSubMeaning").first().prop("id", "inpSubMeaning_" + subMeaningCntr);
    clone.find("#inpExampleSubMeaning").first().prop('id', 'inpExampleSubMeaning_' + subMeaningCntr);
    clone.find('button').prop('id', 'btnRemoveSubMeaning_' + subMeaningCntr);
    clone
        .hide()
        .removeClass('hide')
        .attr('id', 'divSubMeaning_' + subMeaningCntr)
        .appendTo("#"+rootDivId)
        .show('fast');;

    subMeaningCntr++;
};

function removeSubMeaning(buttonId) {
    // document.getElementById(objId).remove();
    // document.getElementById(buttonId).closest(".divClsSubMeaning").remove();
    var divId = document.getElementById(buttonId).closest(".divClsSubMeaning").id;
    // console.log(divId);
    // document.getElementById(buttonId).closest(".divClsMeaning").remove();
    $("#"+divId).hide('fast', function(){ $("#"+divId).remove(); });
    subMeaningCntr--;
};

// $('#addMoreMeaning').click(function () {
//     $(this).before($(".divMeaning").clone());
// });

$('#formAddNew').on('submit', function(e) {
    $("#submit").addClass("active");
    e.preventDefault();
    e.stopPropagation();
    // Initiate Variables With Form Content


    var data = {};
    data.shopLocation = $("#shopLocation").val();
    data.startDate = startDateEpoch;
    data.endDate = endDateEpoch;
    data.noOfRecoms = $("#noOfRecoms").val();

    console.log(data);

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/addnew',
        data: data,
        dataType: 'json',
        timeout: 10000,   // 10 seconds timeout
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("--- Request failed or timed out ---");
            console.log(textStatus);
            console.log(errorThrown);
            $("#submit").removeClass("active");
        },
        success: function(result) {
            console.log("data: ", JSON.stringify(result));
            if (result.success == "true"){
                generateTable(result.topN);
            } else {
                //console.log("ABC");
                //- window.divRecom.style.visibility = 'visible';
                document.getElementById("header").innerHTML = "Failed to get any recommendations!";
                $("#submit").removeClass("active");
            }
        }
    });
})