var bnChCons = ['ক','খ','গ','ঘ','ঙ','চ','ছ','জ','ঝ','ঞ','ট','ঠ','ড','ঢ','ণ','ত','থ','দ','ধ','ন','প','ফ','ব','ভ','ম','য','র','ল','শ','ষ','স','হ','ড়','ঢ়','য়','ৎ'];
var bnChVows = ['অ','আ','ই','ঈ','উ','ঊ','ঋ','এ','ঐ','ও','ঔ'];
var bnNums = ['১','২','৩','৪','৫','৬','৭','৮','৯','১০','১১','১২','১৩','১৪','১৫','১৬','১৭','১৮','১৯','২০','২১','২২','২৩','২৪','২৫','২৬','২৭','২৮','২৯','৩০','৩১','৩২','৩৩','৩৪','৩৫','৩৬','৩৭','৩৮','৩৯','৪০','৪১','৪২','৪৩','৪৪','৪৫','৪৬','৪৭','৪৮','৪৯','৫০'];
var usageCntr = 0;
var meaningCntr = 0;
var subMeaningCntr = 0;
var posCntr = 1;
var phraseCntr = 0;
var phrasalVerbCntr = 0;
var compoundWordCntr = 0;
var derivativeCntr = 0;

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
        var usageIndex = $(this).data('index');
        if (this.checked) {
            this.closest('.btnClsCheckbox').style.backgroundColor = '#d5dbdb';// '#f8c471';
            var i = $(this).siblings('i').first();
            i.removeClass('fa-plus').addClass('fa-times-circle');
            if (this.name == 'phrases') {
                i.css('color', '#0000ff');
                addPhraseSection(usageIndex);
            } else if (this.name == 'phrasalVerbs') {
                i.css('color', '#00bb17');
                addPhrasalVerbSection(usageIndex);
            } else if (this.name == 'compoundWords') {
                i.css('color', '#e38600');
                addCompoundWordSection(usageIndex);
            } else {
                i.css('color', '#7d00df');
                addDerivativeSection(usageIndex);
            }
        } else {
            this.closest('.btnClsCheckbox').style.backgroundColor = '';
            var i = $(this).siblings('i').first();
            i.removeClass('fa-times-circle').addClass('fa-plus');
            if (this.name == 'phrases') {
                i.css('color', '');
                removePhraseSection(usageIndex);
            } else if (this.name == 'phrasalVerbs') {
                i.css('color', '');
                removePhrasalVerbSection(usageIndex);
            } else if (this.name == 'compoundWords') {
                i.css('color', '');
                removeCompoundWordSection(usageIndex);
            } else {
                i.css('color', '');
                removeDerivativeSection(usageIndex);
            }
        }
    });

    $('.selectpicker.clsSelectPos').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
        var divPosDetailId = '#divPosDetails_' + $(this).data('index');
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
                    .appendTo(divPosDetailId)
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
                    .appendTo(divPosDetailId)
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
                    .appendTo(divPosDetailId)
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

//------------------------- Phrases -------------------------
function addPhraseSection(usageIndex) {
    phraseCntr++;
    var divPhrases = $('#divPhrases').clone();
    divPhrases.data("index", usageIndex);
    
    var divContainerPhrases = divPhrases.find("#divContainerPhrases").first();
    divContainerPhrases.prop("id", "divContainerPhrases_" + usageIndex);
    divContainerPhrases.data("index", usageIndex);

    var divIndPhrase = $('#divPhrase').clone();
    divIndPhrase.find('label').html('<font color="#5555ff">' + phraseCntr + '. &nbsp; Phrase</font>');
    var inpPhrase = divIndPhrase.find("#inpPhrase").first();
    inpPhrase.prop("id", "inpPhrase_" + usageIndex+'-'+phraseCntr);
    inpPhrase.data("index", usageIndex+'-'+phraseCntr);
    
    divPhrases
        .hide()
        .removeClass('hide')
        .prop('id', 'divPhrases_' + usageIndex)
        .appendTo('#divPhrasesPlaceholder_' + usageIndex);
    divIndPhrase
        .hide()
        .removeClass('hide')
        .prop('id', 'divPhrase_' + usageIndex+'-'+phraseCntr)
        .appendTo('#divContainerPhrases_' + usageIndex);
    divPhrases.show('fast');
    divIndPhrase.show('fast');
};

function removePhraseSection(usageIndex) {
    // var divId = document.getElementById(buttonId).closest(".divClsUsge").find('.divClsPhrases').first().id;
    $('#divPhrases_'+usageIndex).hide('fast', function(){ $('#divPhrases_'+usageIndex).remove(); });
    phraseCntr = 0;
}

function addMorePhrase(button) {
    var usageIndex = $('#'+button.closest('.divClsPhrases').id).data("index");
    console.log(usageIndex);
    phraseCntr++;
    var divIndPhrase = $('#divPhrase').clone();
    divIndPhrase.find('label').html('<font color="#5555ff">' + phraseCntr + '. &nbsp; Phrase</font>');
    var inpPhrase = divIndPhrase.find("#inpPhrase").first();
    inpPhrase.prop("id", "inpPhrase_" + usageIndex+'-'+phraseCntr);
    inpPhrase.data("index", usageIndex+'-'+phraseCntr);
    
    divIndPhrase
        .hide()
        .removeClass('hide')
        .prop('id', 'divPhrase_' + usageIndex+'-'+phraseCntr)
        .appendTo('#divContainerPhrases_' + usageIndex)
        .show('fast');
};

function removePhrase(buttonId) {
    var divId = document.getElementById(buttonId).closest(".divClsPhrase").id;
    $("#"+divId).hide('fast', function(){ $("#"+divId).remove(); });
    phraseCntr--;
}

//------------------------- Phrasal Verbs -------------------------
function addPhrasalVerbSection(usageIndex) {
    phrasalVerbCntr++;
    var divPhrasalVerbs = $('#divPhrasalVerbs').clone();
    divPhrasalVerbs.data("index", usageIndex);
    
    var divContainerPhrasalVerbs = divPhrasalVerbs.find("#divContainerPhrasalVerbs").first();
    divContainerPhrasalVerbs.prop("id", "divContainerPhrasalVerbs_" + usageIndex);
    divContainerPhrasalVerbs.data("index", usageIndex);

    var divIndPhrasalVerb = $('#divIndPhrasalVerb').clone();
    divIndPhrasalVerb.find('label').html('<font color="#0bdc25">' + phrasalVerbCntr + '. &nbsp; Phrasal Verb</font>');
    var inpPhrasalVerb = divIndPhrasalVerb.find("#inpPhrasalVerb").first();
    inpPhrasalVerb.prop("id", "inpPhrasalVerb_" + usageIndex+'-'+phrasalVerbCntr);
    inpPhrasalVerb.data("index", usageIndex+'-'+phrasalVerbCntr);
    
    divPhrasalVerbs
        .hide()
        .removeClass('hide')
        .prop('id', 'divPhrasalVerbs_' + usageIndex)
        .appendTo('#divPhrasalVerbsPlaceholder_' + usageIndex);
    divIndPhrasalVerb
        .hide()
        .removeClass('hide')
        .prop('id', 'divPhrasalVerb_' + usageIndex+'-'+phrasalVerbCntr)
        .appendTo('#divContainerPhrasalVerbs_' + usageIndex);
    divPhrasalVerbs.show('fast');
    divIndPhrasalVerb.show('fast');
};

function removePhrasalVerbSection(usageIndex) {
    // var divId = document.getElementById(buttonId).closest(".divClsUsge").find('.divClsPhrases').first().id;
    $('#divPhrasalVerbs_'+usageIndex).hide('fast', function(){ $('#divPhrasalVerbs_'+usageIndex).remove(); });
    phrasalVerbCntr = 0;
}

function addMorePhrasalVerb(button) {
    var usageIndex = $('#'+button.closest('.divClsPhrasalVerbs').id).data("index");
    console.log(usageIndex);
    phrasalVerbCntr++;
    var divIndPhrasalVerb = $('#divIndPhrasalVerb').clone();
    divIndPhrasalVerb.find('label').html('<font color="#0bdc25">' + phrasalVerbCntr + '. &nbsp; Phrasal Verb</font>');
    var inpPhrasalVerb = divIndPhrasalVerb.find("#inpPhrasalVerb").first();
    inpPhrasalVerb.prop("id", "inpPhrasalVerb_" + usageIndex+'-'+phrasalVerbCntr);
    inpPhrasalVerb.data("index", usageIndex+'-'+phrasalVerbCntr);
    
    divIndPhrasalVerb
        .hide()
        .removeClass('hide')
        .prop('id', 'divIndPhrasalVerb_' + usageIndex+'-'+phrasalVerbCntr)
        .appendTo('#divContainerPhrasalVerbs_' + usageIndex)
        .show('fast');
};

function removePhrasalVerb(buttonId) {
    var divId = document.getElementById(buttonId).closest(".divClsIndPhrasalVerb").id;
    $("#"+divId).hide('fast', function(){ $("#"+divId).remove(); });
    phrasalVerbCntr--;
}

//------------------------- Compound Words -------------------------
function addCompoundWordSection(usageIndex) {
    compoundWordCntr++;
    var divCompoundWords = $('#divCompoundWords').clone();
    divCompoundWords.data("index", usageIndex);
    
    var divContainerCompoundWords = divCompoundWords.find("#divContainerCompoundWords").first();
    divContainerCompoundWords.prop("id", "divContainerCompoundWords_" + usageIndex);
    divContainerCompoundWords.data("index", usageIndex);

    var divIndCompoundWord = $('#divIndCompoundWord').clone();
    divIndCompoundWord.find('label').html('<font color="#feae3a">' + compoundWordCntr + '. &nbsp; Compound Word</font>');
    var inpCompoundWord = divIndCompoundWord.find("#inpCompoundWord").first();
    inpCompoundWord.prop("id", "inpCompoundWord_" + usageIndex+'-'+compoundWordCntr);
    inpCompoundWord.data("index", usageIndex+'-'+compoundWordCntr);
    
    divCompoundWords
        .hide()
        .removeClass('hide')
        .prop('id', 'divCompoundWords_' + usageIndex)
        .appendTo('#divCompoundWordsPlaceholder_' + usageIndex);
    divIndCompoundWord
        .hide()
        .removeClass('hide')
        .prop('id', 'divIndCompoundWord_' + usageIndex+'-'+compoundWordCntr)
        .appendTo('#divContainerCompoundWords_' + usageIndex);
    divCompoundWords.show('fast');
    divIndCompoundWord.show('fast');
};

function removeCompoundWordSection(usageIndex) {
    // var divId = document.getElementById(buttonId).closest(".divClsUsge").find('.divClsPhrases').first().id;
    $('#divCompoundWords_'+usageIndex).hide('fast', function(){ $('#divCompoundWords_'+usageIndex).remove(); });
    compoundWordCntr = 0;
}

function addMoreCompoundWord(button) {
    var usageIndex = $('#'+button.closest('.divClsCompoundWords').id).data("index");
    console.log(usageIndex);
    compoundWordCntr++;
    var divIndCompoundWord = $('#divIndCompoundWord').clone();
    divIndCompoundWord.find('label').html('<font color="#feae3a">' + compoundWordCntr + '. &nbsp; Compound Word</font>');
    var inpCompoundWord = divIndCompoundWord.find("#inpCompoundWord").first();
    inpCompoundWord.prop("id", "inpCompoundWord_" + usageIndex+'-'+compoundWordCntr);
    inpCompoundWord.data("index", usageIndex+'-'+compoundWordCntr);
    
    divIndCompoundWord
        .hide()
        .removeClass('hide')
        .prop('id', 'divIndCompoundWord_' + usageIndex+'-'+compoundWordCntr)
        .appendTo('#divContainerCompoundWords_' + usageIndex)
        .show('fast');
};

function removeCompoundWord(buttonId) {
    var divId = document.getElementById(buttonId).closest(".divClsIndCompoundWord").id;
    $("#"+divId).hide('fast', function(){ $("#"+divId).remove(); });
    compoundWordCntr--;
}

//------------------------- Derivatives -------------------------
function addDerivativeSection(usageIndex) {
    derivativeCntr++;
    var divDerivatives = $('#divDerivatives').clone();
    divDerivatives.data("index", usageIndex);

    var divContainerDerivatives = divDerivatives.find("#divContainerDerivatives").first();
    divContainerDerivatives.prop("id", "divContainerDerivatives_" + usageIndex);
    divContainerDerivatives.data("index", usageIndex);

    var divIndDerivative = $('#divIndDerivative').clone();
    divIndDerivative.find('label').html('<font color="#a638fc">' + derivativeCntr + '. &nbsp; Darivative</font>');
    var inpDerivative = divIndDerivative.find("#inpDerivative").first();
    inpDerivative.prop("id", "inpDerivative_" + usageIndex+'-'+derivativeCntr);
    inpDerivative.data("index", usageIndex+'-'+derivativeCntr);

    divDerivatives
        .hide()
        .removeClass('hide')
        .prop('id', 'divDerivatives_' + usageIndex)
        .appendTo('#divDerivativesPlaceholder_' + usageIndex);
    divIndDerivative
        .hide()
        .removeClass('hide')
        .prop('id', 'divIndDerivative_' + usageIndex+'-'+derivativeCntr)
        .appendTo('#divContainerDerivatives_' + usageIndex);
    divDerivatives.show('fast');
    divIndDerivative.show('fast');
};

function removeDerivativeSection(usageIndex) {
    // var divId = document.getElementById(buttonId).closest(".divClsUsge").find('.divClsPhrases').first().id;
    $('#divDerivatives_'+usageIndex).hide('fast', function(){ $('#divDerivatives_'+usageIndex).remove(); });
    derivativeCntr = 0;
}

function addMoreDerivative(button) {
    var usageIndex = $('#'+button.closest('.divClsDerivatives').id).data("index");
    console.log(usageIndex);
    derivativeCntr++;
    var divIndDerivative = $('#divIndDerivative').clone();
    divIndDerivative.find('label').html('<font color="#a638fc">' + derivativeCntr + '. &nbsp; Darivative</font>');
    var inpDerivative = divIndDerivative.find("#inpDerivative").first();
    inpDerivative.prop("id", "inpDerivative_" + usageIndex+'-'+derivativeCntr);
    inpDerivative.data("index", usageIndex+'-'+derivativeCntr);
    
    divIndDerivative
        .hide()
        .removeClass('hide')
        .prop('id', 'divIndDerivative_' + usageIndex+'-'+derivativeCntr)
        .appendTo('#divContainerDerivatives_' + usageIndex)
        .show('fast');
};

function removeDerivative(buttonId) {
    var divId = document.getElementById(buttonId).closest(".divClsIndDerivative").id;
    $("#"+divId).hide('fast', function(){ $("#"+divId).remove(); });
    derivativeCntr--;
}

//------------------------- Meaning -------------------------
function addMeaning(button) {
    var clone = $('#divMeaning').clone();
    clone.find("#inpMeaning").first().prop("id", "inpMeaning_" + meaningCntr);
    clone.find("#inpExample").first().prop('id', 'inpExample_' + meaningCntr);
    clone.find('button').prop('id', 'btnAddSubMeaning_' + meaningCntr);
    clone
        .hide()
        .removeClass('hide')
        .attr('id', 'divMeaning_' + meaningCntr)
        .insertBefore(button)
        .show('fast');

    meaningCntr++;
};

function removeMeaning(buttonId) {
    var divId = document.getElementById(buttonId).closest(".divClsMeaning").id;
    $("#"+divId).hide('fast', function(){ $("#"+divId).remove(); });
    meaningCntr--;
};

//------------------------- Sub-meaning -------------------------
function addSubMeaning(buttonId) {
    var button = document.getElementById(buttonId);
    var rootDivId = button.closest('.divClsMeaning').id;
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
    var divId = document.getElementById(buttonId).closest(".divClsSubMeaning").id;
    $("#"+divId).hide('fast', function(){ $("#"+divId).remove(); });
    subMeaningCntr--;
};

//------------------------- Form Submission -------------------------
$('#formAddNew').on('submit', function(e) {
    $("#submit").addClass("active");
    e.preventDefault();
    e.stopPropagation();

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