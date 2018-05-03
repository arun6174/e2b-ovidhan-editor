var bnChCons = ['ক','খ','গ','ঘ','ঙ','চ','ছ','জ','ঝ','ঞ','ট','ঠ','ড','ঢ','ণ','ত','থ','দ','ধ','ন','প','ফ','ব','ভ','ম','য','র','ল','শ','ষ','স','হ','ড়','ঢ়','য়','ৎ'];
var bnChVows = ['অ','আ','ই','ঈ','উ','ঊ','ঋ','এ','ঐ','ও','ঔ'];
var bnNums = ['১','২','৩','৪','৫','৬','৭','৮','৯','১০','১১','১২','১৩','১৪','১৫','১৬','১৭','১৮','১৯','২০','২১','২২','২৩','২৪','২৫','২৬','২৭','২৮','২৯','৩০','৩১','৩২','৩৩','৩৪','৩৫','৩৬','৩৭','৩৮','৩৯','৪০','৪১','৪২','৪৩','৪৪','৪৫','৪৬','৪৭','৪৮','৪৯','৫০'];
var usageCntr = 0;
var meaningCntr = 0;
var subMeaningCntr = 0;
var posCntr = 0;
var phraseCntr = 0;
var phrasalVerbCntr = 0;
var compoundWordCntr = 0;
var derivativeCntr = 0;

var dict = {};
var deletedUsageIndices = [];

$(document).ready(function() {
    console.log( 'ready!' );

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

// $('#selectPoS_1-1').on('shown.bs.select', function (e) {
//     console.log($(this).attr('data-index'));
// });

function fnPosOnChange(selectId) {
    var e = document.getElementById(selectId);
    var elemIndex = e.dataset.index;
    var divPosDetailId = '#divPosDetails_' + elemIndex;
    var diParts = elemIndex.split('-');
    var usageIndex = parseInt(diParts[0]);
    var itemIndex = parseInt(diParts[1]);
    var usageSectionCode = 'pos';
    // console.log(divPosDetailId);
    // return;

    if (e.options[e.selectedIndex].value == 'noun') {
        if ($('#divVerb_'+elemIndex).length > 0) {
            $('#divVerb_'+elemIndex).remove();
        } else if ($('#divAdj_'+elemIndex).length > 0) {
            $('#divAdj_'+elemIndex).remove();
        }
        if($('#divNoun_' + elemIndex).length == 0) {
            var newSP = $('#selectNounType_x-x').clone();
            newSP.attr('data-index', elemIndex);
            newSP.attr('id', 'selectNounType_' + elemIndex);
            newSP.removeClass('hide');

            var clone = $('#divNoun_x-x').clone();
            clone.attr('data-index', elemIndex);
            clone.attr('id', 'divNoun_' + elemIndex);
            clone.find('.inpClsPlural').first().attr('data-index', elemIndex);
            clone.find('.inpClsPlural').first().attr('id', 'inpPlural_' + elemIndex);
            clone.find('#selectNounType').first().attr('id', 'selectNounType_' + elemIndex);
            clone
                .hide()
                .removeClass('hide')
                .appendTo(divPosDetailId)
                .show('fast');
            newSP.appendTo('#divNoun_' + elemIndex);
            newSP.selectpicker('refresh');

            dict[usageIndex].sections[usageSectionCode].items[itemIndex].posDetails = {
                plural: '',
                nounTypes: []
            };
        }
    } else if (e.options[e.selectedIndex].value == 'verb') {
        if ($('#divNoun_'+elemIndex).length > 0) {
            $('#divNoun_'+elemIndex).remove();
        } else if ($('#divAdj_'+elemIndex).length > 0) {
            $('#divAdj_'+elemIndex).remove();
        }
        if($('#divVerb_' + elemIndex).length == 0) {
            var newSP = $('#selectVerbType_x-x').clone();
            newSP.attr('data-index', elemIndex);
            newSP.attr('id', 'selectVerbType_' + elemIndex);
            newSP.removeClass('hide');

            var clone = $('#divVerb_x-x').clone();
            clone.attr('data-index', elemIndex);
            clone.attr('id', 'divVerb_' + elemIndex);
            clone.find('.inpCls3rdPerson').first().attr('data-index', elemIndex);
            clone.find('.inpCls3rdPerson').first().attr('id', 'inp3rdPerson_' + elemIndex);
            clone.find('.inpClsPresentCont').first().attr('data-index', elemIndex);
            clone.find('.inpClsPresentCont').first().attr('id', 'inpPresentCont_' + elemIndex);
            clone.find('.inpClsPast').first().attr('data-index', elemIndex);
            clone.find('.inpClsPast').first().attr('id', 'inpPast_' + elemIndex);
            clone.find('.inpClsPastPart').first().attr('data-index', elemIndex);
            clone.find('.inpClsPastPart').first().attr('id', 'inpPastPart_' + elemIndex);
            clone
                .hide()
                .removeClass('hide')
                .appendTo(divPosDetailId)
                .show('fast');
            newSP.appendTo('#divVerb_' + elemIndex);
            newSP.selectpicker('refresh');

            dict[usageIndex].sections[usageSectionCode].items[itemIndex].posDetails = {
                verbTypes: [],
                forms: {
                    thirdPerson: '',
                    presentCont: '',
                    past: '',
                    pastPart: ''
                }
            };
        }
    } else if (e.options[e.selectedIndex].value == 'adj') {
        if ($('#divNoun_'+elemIndex).length > 0) {
            $('#divNoun_'+elemIndex).remove();
        } else if ($('#divVerb_'+elemIndex).length > 0) {
            $('#divVerb_'+elemIndex).remove();
        }
        if($('#divAdj_' + elemIndex).length == 0) {
            var clone = $('#divAdj_x-x').clone();
            clone.attr('data-index', elemIndex);
            clone.attr('id', 'divAdj_' + elemIndex);
            clone.find('.inpClsComparative').first().attr('data-index', elemIndex);
            clone.find('.inpClsComparative').first().attr('id', 'inpComparative_' + elemIndex);
            clone.find('.inpClsSuperlative').first().attr('data-index', elemIndex);
            clone.find('.inpClsSuperlative').first().attr('id', 'inpSuperlative_' + elemIndex);
            clone
                .hide()
                .removeClass('hide')
                .appendTo(divPosDetailId)
                .show('fast');
            
            dict[usageIndex].sections[usageSectionCode].items[itemIndex].posDetails = {
                forms: {
                    comparative: '',
                    superlative: ''
                }
            };
        }
    } else {
        if ($('#divNoun_'+elemIndex).length > 0) {
            $('#divNoun_'+elemIndex).hide('fast', function(){ this.remove(); });
        } else if ($('#divVerb_'+elemIndex).length > 0) {
            $('#divVerb_'+elemIndex).hide('fast', function(){ this.remove(); });
        } else if ($('#divAdj_'+elemIndex).length > 0) {
            $('#divAdj_'+elemIndex).hide('fast', function(){ this.remove(); });
        }
        dict[usageIndex].sections[usageSectionCode].items[itemIndex].posDetails = {};
    }    
}

function toggleBtnGroupHandler(button) {
    var usageIndex = $(button).attr('data-index');
    if (button.checked) {
        button.closest('.btnClsCheckbox').style.backgroundColor = '#d5dbdb';// '#f8c471';
        // console.log('ABC');
        var i = $(button).siblings('i').first();
        i.removeClass('fa-plus').addClass('fa-times-circle');
        // console.log(button.name);
        if (button.name == 'phrases') {
            i.css('color', '#0000ff');
            addPhraseSection(usageIndex);
        } else if (button.name == 'phrasalVerbs') {
            i.css('color', '#00bb17');
            addPhrasalVerbSection(usageIndex);
        } else if (button.name == 'compoundWords') {
            i.css('color', '#e38600');
            addCompoundWordSection(usageIndex);
        } else {
            i.css('color', '#7d00df');
            addDerivativeSection(usageIndex);
        }
    } else {
        button.closest('.btnClsCheckbox').style.backgroundColor = '';
        var i = $(button).siblings('i').first();
        i.removeClass('fa-times-circle').addClass('fa-plus');
        if (button.name == 'phrases') {
            i.css('color', '');
            removePhraseSection(usageIndex);
        } else if (button.name == 'phrasalVerbs') {
            i.css('color', '');
            removePhrasalVerbSection(usageIndex);
        } else if (button.name == 'compoundWords') {
            i.css('color', '');
            removeCompoundWordSection(usageIndex);
        } else {
            i.css('color', '');
            removeDerivativeSection(usageIndex);
        }
    }
}


//-~-~-~-~-~-~-~-~-~-~-~-~-~-~ USAGE -~-~-~-~-~-~-~-~-~-~-~-~-~-~
function addUsage(button) {
    usageCntr++;
    var usageIndex = usageCntr;
    dict[usageIndex] = {
        sections: {},
    };

    var $divUsage = $('#divUsage_x').clone();
    $divUsage.attr('id', 'divUsage_' + usageIndex);
    $divUsage.attr('data-index', usageIndex);
    $divUsage.find('label').html('Usage ' + usageIndex);
    if (usageCntr == 1) {
        $divUsage.find('#btnRemoveUsage_x').remove();
    } else {
        $divUsage.find('#btnRemoveUsage_x').attr('id', 'btnRemoveUsage_' + usageIndex);
    }
    $divUsage.find('#btnAddPoS_x').attr('data-index', usageIndex);
    $divUsage.find('#btnAddPoS_x').attr('id', 'btnAddPoS_' + usageIndex);
    $divUsage.find('#divPartOfSpeechPlaceholder_x').attr('data-index', usageIndex);
    $divUsage.find('#divPartOfSpeechPlaceholder_x').attr('id', 'divPartOfSpeechPlaceholder_' + usageIndex);
    $divUsage.find('#divPhrasesPlaceholder_x').attr('data-index', usageIndex);
    $divUsage.find('#divPhrasesPlaceholder_x').attr('id', 'divPhrasesPlaceholder_' + usageIndex);
    $divUsage.find('#divPhrasalVerbsPlaceholder_x').attr('data-index', usageIndex);
    $divUsage.find('#divPhrasalVerbsPlaceholder_x').attr('id', 'divPhrasalVerbsPlaceholder_' + usageIndex);
    $divUsage.find('#divCompoundWordsPlaceholder_x').attr('data-index', usageIndex);
    $divUsage.find('#divCompoundWordsPlaceholder_x').attr('id', 'divCompoundWordsPlaceholder_' + usageIndex);
    $divUsage.find('#divDerivativesPlaceholder_x').attr('data-index', usageIndex);
    $divUsage.find('#divDerivativesPlaceholder_x').attr('id', 'divDerivativesPlaceholder_' + usageIndex);
    $divUsage.find('#divUsageCtrlButtons_x').attr('data-index', usageIndex);
    $divUsage.find('#divUsageCtrlButtons_x').attr('id', 'divUsageCtrlButtons_' + usageIndex);
    $divUsage.find('#divBtnGroupUsage_x').attr('data-index', usageIndex);
    $divUsage.find('#divBtnGroupUsage_x').attr('id', 'divBtnGroupUsage_' + usageIndex);
    $divUsage.find('#chkPhrases_x').attr('data-index', usageIndex);
    $divUsage.find('#chkPhrases_x').attr('id', 'chkPhrases_' + usageIndex);
    $divUsage.find('#chkPhrasalVerbs_x').attr('data-index', usageIndex);
    $divUsage.find('#chkPhrasalVerbs_x').attr('id', 'chkPhrasalVerbs_' + usageIndex);
    $divUsage.find('#chkCompoundWords_x').attr('data-index', usageIndex);
    $divUsage.find('#chkCompoundWords_x').attr('id', 'chkCompoundWords_' + usageIndex);
    $divUsage.find('#chkDerivatives_x').attr('data-index', usageIndex);
    $divUsage.find('#chkDerivatives_x').attr('id', 'chkDerivatives_' + usageIndex);
    
    $divUsage
        .hide()
        .removeClass('hide')
        .appendTo('#divUsagePlaceholder')
        .show('fast');
};

function removeUsage(buttonId) {
    $('#'+buttonId).closest('.divClsUsage').hide('fast', function(){ $(this).remove(); });
}

//-~-~-~-~-~-~-~-~-~-~-~-~ Part of Speech -~-~-~-~-~-~-~-~-~-~-~-~
function addPartOfSpeech(buttonId) {
    var usageIndex = $('#'+buttonId).data('index');
    var usageSectionCode = 'pos';

    if (!(usageSectionCode in dict[usageIndex].sections)) {
        dict[usageIndex].sections[usageSectionCode] = {
            itemCntr: 0,
            items: {},
            deletedItemIndices: []
        };
    }
    var posCntr = ++(dict[usageIndex].sections[usageSectionCode].itemCntr);
    dict[usageIndex].sections[usageSectionCode].items[posCntr] = {
        pos: '',
        posDetails: {},
        meaningCntr: 0,
        meaning: {},
        deletedMeaningIndices: []
    };

    var elemIndex = usageIndex + '-' + posCntr;

    var $divPartOfSpeech = $('#divPartOfSpeech_x-x').clone();
    $divPartOfSpeech.attr('data-index', elemIndex);
    $divPartOfSpeech.attr('id', 'divPartOfSpeech_' + elemIndex);

    $divPartOfSpeech.find('.divClsPos').first().attr('data-index', elemIndex);
    $divPartOfSpeech.find('.divClsPos').first().attr('id', 'divPos_' + elemIndex);

    $divPartOfSpeech.find('label').html('<font color="#c70039">'+usageIndex+'.'+posCntr+' &nbsp; Part of Speech &emsp;</font>');
    
    $divPartOfSpeech.find('.btnClsRemovePartOfSpeech').first().attr('data-index', elemIndex);
    $divPartOfSpeech.find('.btnClsRemovePartOfSpeech').first().attr('id', 'btnRemovePartOfSpeech_' + elemIndex);

    $divPartOfSpeech.find('.divClsSelectPos').first().attr('id', 'divSelectPos_'+elemIndex);
    $divPartOfSpeech.find('.divClsSelectPos').first().attr('data-index', elemIndex);

    $divPartOfSpeech.find('.divClsPosDetails').first().attr('id', 'divPosDetails_'+elemIndex);
    $divPartOfSpeech.find('.divClsPosDetails').first().attr('data-index', elemIndex);

    $divPartOfSpeech.find('.divClsMeaningSection').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divPartOfSpeech.find('.divClsMeaningSection').first().attr('id', 'divMeaningSection_' + usageSectionCode+'_'+elemIndex);
    $divPartOfSpeech.find('.btnClsAddMeaning').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divPartOfSpeech.find('.btnClsAddMeaning').first().attr('id', 'btnAddMeaning_' + usageSectionCode+'_'+elemIndex);

    var newSP = $('#selectPoS_x-x').clone();
    newSP.attr('data-index', elemIndex);
    newSP.attr('id', 'selectPoS_' + elemIndex);
    newSP.removeClass('hide');

    $divPartOfSpeech
        .hide()
        .removeClass('hide')
        .appendTo('#divPartOfSpeechPlaceholder_' + usageIndex)
        .show('fast');
    newSP.insertAfter($divPartOfSpeech.find('label').first());
}

function removePartOfSpeech(button) {
    var btnDataIndex = $('#'+button.id).data('index');
    var usageSectionCode = 'pos';
    var diParts = btnDataIndex.split('-');
    var usageIndex = parseInt(diParts[0]);
    var itemIndex = parseInt(diParts[1]);

    // Update dict - 1)remove meaning, 2)update deleted indices
    // Don't decrease meaningCntr, since that would create duplicate indices after new addition
    dict[usageIndex].sections[usageSectionCode].items[itemIndex] = {};
    dict[usageIndex].sections[usageSectionCode].deletedItemIndices.push(itemIndex);

    // Remove element from DOM
    $('#divPartOfSpeech_'+btnDataIndex).hide('fast', function(){ this.remove(); });
}

//-~-~-~-~-~-~-~-~-~-~-~-~ Phrases -~-~-~-~-~-~-~-~-~-~-~-~
function addPhraseSection(usageIndex) {
    var usageSectionCode = 'phr';

    if (!(usageSectionCode in dict[usageIndex].sections) || 
    jQuery.isEmptyObject(dict[usageIndex].sections[usageSectionCode])) {
        dict[usageIndex].sections[usageSectionCode] = {
            itemCntr: 0,
            items: {},
            deletedItemIndices: []
        };
    }
    var phraseCntr = ++(dict[usageIndex].sections[usageSectionCode].itemCntr);
    // console.log(phraseCntr);
    dict[usageIndex].sections[usageSectionCode].items[phraseCntr] = {
        phrase: '',
        meaningCntr: 0,
        meaning: {},
        deletedMeaningIndices: []
    };

    var $divPhrases = $('#divPhrases_x').clone();
    $divPhrases.attr('data-index', usageIndex);
    $divPhrases.attr('id', 'divPhrases_' + usageIndex);
    $divPhrases.find('.divClsContainerPhrases').first().attr('data-index', usageIndex);
    $divPhrases.find('.divClsContainerPhrases').first().attr('id', 'divContainerPhrases_' + usageIndex);
    $divPhrases.find('.btnClsAddMorePhrase').first().attr('data-index', usageIndex);
    $divPhrases.find('.btnClsAddMorePhrase').first().attr('id', 'btnAddMorePhrase_' + usageIndex);

    var elemIndex = usageIndex + '-' + phraseCntr;
    var $divIndPhrase = $('#divIndPhrase_x-x').clone();
    $divIndPhrase.attr('data-index', elemIndex);
    $divIndPhrase.attr('id', 'divIndPhrase_' + elemIndex);
    $divIndPhrase.find('.btnClsRemovePhrase').first().attr('data-index', elemIndex);
    $divIndPhrase.find('.btnClsRemovePhrase').first().attr('id', 'btnRemovePhrase_' + elemIndex);
    $divIndPhrase.find('label').html('<font color="#5555ff">' + phraseCntr + '. &nbsp; Phrase</font>');
    $divIndPhrase.find('.inpClsPhrase').first().attr('data-index', elemIndex);
    $divIndPhrase.find('.inpClsPhrase').first().attr('id', 'inpPhrase_' + elemIndex);
    $divIndPhrase.find('.divClsMeaningSection').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndPhrase.find('.divClsMeaningSection').first().attr('id', 'divMeaningSection_' + usageSectionCode+'_'+elemIndex);
    $divIndPhrase.find('.btnClsAddMeaning').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndPhrase.find('.btnClsAddMeaning').first().attr('id', 'btnAddMeaning_' + usageSectionCode+'_'+elemIndex);
    
    $divPhrases
        .hide()
        .removeClass('hide')
        .appendTo('#divPhrasesPlaceholder_' + usageIndex);
    $divIndPhrase
        .hide()
        .removeClass('hide')
        .appendTo('#divContainerPhrases_' + usageIndex);
    $divPhrases.show('fast');
    $divIndPhrase.show('fast');
};

function removePhraseSection(usageIndex) {
    // Update dict
    var usageSectionCode = 'phr';
    dict[usageIndex].sections[usageSectionCode] = {};
    
    // Remove element from DOM
    $('#divPhrases_'+usageIndex).hide('fast', function(){ this.remove(); });
}

function addMorePhrase(button) {
    var usageSectionCode = 'phr';
    var usageIndex = $('#'+button.id).data('index');

    var phraseCntr = ++(dict[usageIndex].sections[usageSectionCode].itemCntr);
    dict[usageIndex].sections[usageSectionCode].items[phraseCntr] = {
        phrase: '',
        meaningCntr: 0,
        meaning: {},
        deletedMeaningIndices: []
    };

    var elemIndex = usageIndex + '-' + phraseCntr;
    var $divIndPhrase = $('#divIndPhrase_x-x').clone();
    $divIndPhrase.attr('data-index', elemIndex);
    $divIndPhrase.attr('id', 'divIndPhrase_' + elemIndex);
    $divIndPhrase.find('.btnClsRemovePhrase').first().attr('data-index', elemIndex);
    $divIndPhrase.find('.btnClsRemovePhrase').first().attr('id', 'btnRemovePhrase_' + elemIndex);
    $divIndPhrase.find('label').html('<font color="#5555ff">' + phraseCntr + '. &nbsp; Phrase</font>');
    $divIndPhrase.find('.inpClsPhrase').first().attr('data-index', elemIndex);
    $divIndPhrase.find('.inpClsPhrase').first().attr('id', 'inpPhrase_' + elemIndex);
    $divIndPhrase.find('.divClsMeaningSection').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndPhrase.find('.divClsMeaningSection').first().attr('id', 'divMeaningSection_' + usageSectionCode+'_'+elemIndex);
    $divIndPhrase.find('.btnClsAddMeaning').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndPhrase.find('.btnClsAddMeaning').first().attr('id', 'btnAddMeaning_' + usageSectionCode+'_'+elemIndex);
    
    $divIndPhrase
        .hide()
        .removeClass('hide')
        .appendTo('#divContainerPhrases_' + usageIndex)
        .show('fast');
};

function removePhrase(buttonId) {
    var btnDataIndex = $('#'+buttonId).data('index');
    var usageSectionCode = 'phr';
    var diParts = btnDataIndex.split('-');
    var usageIndex = parseInt(diParts[0]);
    var itemIndex = parseInt(diParts[1]);
    
    // Update dict
    dict[usageIndex].sections[usageSectionCode].items[itemIndex] = {};
    dict[usageIndex].sections[usageSectionCode].deletedItemIndices.push(itemIndex);

    // Remove element from DOM
    $('#divIndPhrase_'+btnDataIndex).hide('fast', function(){ this.remove(); });
}

//-~-~-~-~-~-~-~-~-~-~-~-~ Phrasal Verbs -~-~-~-~-~-~-~-~-~-~-~-~
function addPhrasalVerbSection(usageIndex) {
    // dict[usageIndex].phrasalVerbCntr++;
    // var phrasalVerbCntr = dict[usageIndex].phrasalVerbCntr;
    var usageSectionCode = 'phv';

    if (!(usageSectionCode in dict[usageIndex].sections) || 
    jQuery.isEmptyObject(dict[usageIndex].sections[usageSectionCode])) {
        dict[usageIndex].sections[usageSectionCode] = {
            itemCntr: 0,
            items: {},
            deletedItemIndices: []
        };
    }
    var phrasalVerbCntr = ++(dict[usageIndex].sections[usageSectionCode].itemCntr);
    dict[usageIndex].sections[usageSectionCode].items[phrasalVerbCntr] = {
        phrasalVerb: '',
        meaningCntr: 0,
        meaning: {},
        deletedMeaningIndices: []
    };
    
    var $divPhrasalVerbs = $('#divPhrasalVerbs_x').clone();
    $divPhrasalVerbs.attr('data-index', usageIndex);
    $divPhrasalVerbs.attr('id', 'divPhrasalVerbs_' + usageIndex)
    $divPhrasalVerbs.find('.divClsContainerPhrasalVerbs').first().attr('data-index', usageIndex);
    $divPhrasalVerbs.find('.divClsContainerPhrasalVerbs').first().attr('id', 'divContainerPhrasalVerbs_' + usageIndex);
    $divPhrasalVerbs.find('.btnClsAddMorePhrasalVerb').first().attr('data-index', usageIndex);
    $divPhrasalVerbs.find('.btnClsAddMorePhrasalVerb').first().attr('id', 'btnAddMorePhrasalVerb_' + usageIndex);
    
    var elemIndex = usageIndex + '-' + phrasalVerbCntr;
    var $divIndPhrasalVerb = $('#divIndPhrasalVerb_x-x').clone();
    $divIndPhrasalVerb.attr('data-index', elemIndex);
    $divIndPhrasalVerb.attr('id', 'divIndPhrasalVerb_' + elemIndex);
    $divIndPhrasalVerb.find('.btnClsRemovePhrasalVerb').first().attr('data-index', elemIndex);
    $divIndPhrasalVerb.find('.btnClsRemovePhrasalVerb').first().attr('id', 'btnRemovePhrasalVerb_' + elemIndex);
    $divIndPhrasalVerb.find('label').html('<font color="#0bdc25">' + phrasalVerbCntr + '. &nbsp; Phrasal Verb</font>');
    $divIndPhrasalVerb.find('.inpClsPhrasalVerb').first().attr('data-index', elemIndex);
    $divIndPhrasalVerb.find('.inpClsPhrasalVerb').first().attr('id', 'inpPhrasalVerb_' + elemIndex);
    $divIndPhrasalVerb.find('.divClsMeaningSection').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndPhrasalVerb.find('.divClsMeaningSection').first().attr('id', 'divMeaningSection_' + usageSectionCode+'_'+elemIndex);
    $divIndPhrasalVerb.find('.btnClsAddMeaning').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndPhrasalVerb.find('.btnClsAddMeaning').first().attr('id', 'btnAddMeaning_' + usageSectionCode+'_'+elemIndex);
    
    $divPhrasalVerbs
        .hide()
        .removeClass('hide')
        .appendTo('#divPhrasalVerbsPlaceholder_' + usageIndex);
    $divIndPhrasalVerb
        .hide()
        .removeClass('hide')
        .appendTo('#divContainerPhrasalVerbs_' + usageIndex);
    $divPhrasalVerbs.show('fast');
    $divIndPhrasalVerb.show('fast');
};

function removePhrasalVerbSection(usageIndex) {
    // Update dict
    var usageSectionCode = 'phv';
    dict[usageIndex].sections[usageSectionCode] = {};
    
    // Remove element from DOM
    $('#divPhrasalVerbs_'+usageIndex).hide('fast', function(){ this.remove(); });
}

function addMorePhrasalVerb(button) {
    var usageSectionCode = 'phv';
    var usageIndex = $('#'+button.id).data('index');

    var phrasalVerbCntr = ++(dict[usageIndex].sections[usageSectionCode].itemCntr);
    dict[usageIndex].sections[usageSectionCode].items[phrasalVerbCntr] = {
        phrasalVerb: '',
        meaningCntr: 0,
        meaning: {},
        deletedMeaningIndices: []
    };

    var elemIndex = usageIndex + '-' + phrasalVerbCntr;
    var $divIndPhrasalVerb = $('#divIndPhrasalVerb_x-x').clone();
    $divIndPhrasalVerb.attr('data-index', elemIndex);
    $divIndPhrasalVerb.attr('id', 'divIndPhrasalVerb_' + elemIndex);
    $divIndPhrasalVerb.find('.btnClsRemovePhrasalVerb').first().attr('data-index', elemIndex);
    $divIndPhrasalVerb.find('.btnClsRemovePhrasalVerb').first().attr('id', 'btnRemovePhrasalVerb_' + elemIndex);
    $divIndPhrasalVerb.find('label').html('<font color="#0bdc25">' + phrasalVerbCntr + '. &nbsp; Phrasal Verb</font>');
    $divIndPhrasalVerb.find('.inpClsPhrasalVerb').first().attr('data-index', elemIndex);
    $divIndPhrasalVerb.find('.inpClsPhrasalVerb').first().attr('id', 'inpPhrasalVerb_' + elemIndex);
    $divIndPhrasalVerb.find('.divClsMeaningSection').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndPhrasalVerb.find('.divClsMeaningSection').first().attr('id', 'divMeaningSection_' + usageSectionCode+'_'+elemIndex);
    $divIndPhrasalVerb.find('.btnClsAddMeaning').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndPhrasalVerb.find('.btnClsAddMeaning').first().attr('id', 'btnAddMeaning_' + usageSectionCode+'_'+elemIndex);

    $divIndPhrasalVerb
        .hide()
        .removeClass('hide')
        .appendTo('#divContainerPhrasalVerbs_' + usageIndex)
        .show('fast');
};

function removePhrasalVerb(buttonId) {
    var btnDataIndex = $('#'+buttonId).data('index');
    var usageSectionCode = 'phv';
    var diParts = btnDataIndex.split('-');
    var usageIndex = parseInt(diParts[0]);
    var itemIndex = parseInt(diParts[1]);
    
    // Update dict
    dict[usageIndex].sections[usageSectionCode].items[itemIndex] = {};
    dict[usageIndex].sections[usageSectionCode].deletedItemIndices.push(itemIndex);

    // Remove element from DOM
    $('#divIndPhrasalVerb_'+btnDataIndex).hide('fast', function(){ this.remove(); });
}

//-~-~-~-~-~-~-~-~-~-~-~-~ Compound Words -~-~-~-~-~-~-~-~-~-~-~-~
function addCompoundWordSection(usageIndex) {
    var usageSectionCode = 'cpw';

    if (!(usageSectionCode in dict[usageIndex].sections) || 
    jQuery.isEmptyObject(dict[usageIndex].sections[usageSectionCode])) {
        dict[usageIndex].sections[usageSectionCode] = {
            itemCntr: 0,
            items: {},
            deletedItemIndices: []
        };
    }
    var compoundWordCntr = ++(dict[usageIndex].sections[usageSectionCode].itemCntr);
    dict[usageIndex].sections[usageSectionCode].items[compoundWordCntr] = {
        compoundWord: '',
        meaningCntr: 0,
        meaning: {},
        deletedMeaningIndices: []
    };

    var $divCompoundWords = $('#divCompoundWords_x').clone();
    $divCompoundWords.attr('data-index', usageIndex);
    $divCompoundWords.attr('id', 'divCompoundWords_' + usageIndex);
    $divCompoundWords.find('.divClsContainerCompoundWords').first().attr('data-index', usageIndex);
    $divCompoundWords.find('.divClsContainerCompoundWords').first().attr('id', 'divContainerCompoundWords_' + usageIndex);
    $divCompoundWords.find('.btnClsAddMoreCompoundWord').first().attr('data-index', usageIndex);
    $divCompoundWords.find('.btnClsAddMoreCompoundWord').first().attr('id', 'btnAddMoreCompoundWord_' + usageIndex);
    
    var elemIndex = usageIndex + '-' + compoundWordCntr;
    var $divIndCompoundWord = $('#divIndCompoundWord_x-x').clone();
    $divIndCompoundWord.attr('data-index', elemIndex);
    $divIndCompoundWord.attr('id', 'divIndCompoundWord_' + elemIndex);
    $divIndCompoundWord.find('.btnClsRemoveCompoundWord').first().attr('data-index', elemIndex);
    $divIndCompoundWord.find('.btnClsRemoveCompoundWord').first().attr('id', 'btnRemoveCompoundWord_' + elemIndex);
    $divIndCompoundWord.find('label').html('<font color="#feae3a">' + compoundWordCntr + '. &nbsp; Compound Word</font>');
    $divIndCompoundWord.find('.inpClsCompoundWord').first().attr('data-index', elemIndex);
    $divIndCompoundWord.find('.inpClsCompoundWord').first().attr('id', 'inpCompoundWord_' + elemIndex);
    $divIndCompoundWord.find('.divClsMeaningSection').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndCompoundWord.find('.divClsMeaningSection').first().attr('id', 'divMeaningSection_' + usageSectionCode+'_'+elemIndex);
    $divIndCompoundWord.find('.btnClsAddMeaning').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndCompoundWord.find('.btnClsAddMeaning').first().attr('id', 'btnAddMeaning_' + usageSectionCode+'_'+elemIndex);
    
    $divCompoundWords
        .hide()
        .removeClass('hide')
        .appendTo('#divCompoundWordsPlaceholder_' + usageIndex);
    $divIndCompoundWord
        .hide()
        .removeClass('hide')
        .appendTo('#divContainerCompoundWords_' + usageIndex);
    $divCompoundWords.show('fast');
    $divIndCompoundWord.show('fast');
};

function removeCompoundWordSection(usageIndex) {
    // Update dict
    var usageSectionCode = 'cpw';
    dict[usageIndex].sections[usageSectionCode] = {};
    
    // Remove element from DOM
    $('#divCompoundWords_'+usageIndex).hide('fast', function(){ this.remove(); });
}

function addMoreCompoundWord(button) {
    var usageIndex = $('#'+button.closest('.divClsCompoundWords').id).attr('data-index');
    // console.log(usageIndex);
    // dict[usageIndex].compoundWordCntr++;
    // var compoundWordCntr = dict[usageIndex].compoundWordCntr;
    
    // var elemIndex = usageIndex + '-' + compoundWordCntr;
    // var $divIndCompoundWord = $('#divIndCompoundWord').clone();
    // $divIndCompoundWord.find('label').html('<font color="#feae3a">' + compoundWordCntr + '. &nbsp; Compound Word</font>');
    // var inpCompoundWord = $divIndCompoundWord.find('#inpCompoundWord').first();
    // inpCompoundWord.attr('id', 'inpCompoundWord_' + elemIndex);
    // inpCompoundWord.attr('data-index', elemIndex);

    var usageSectionCode = 'cpw';
    var usageIndex = $('#'+button.id).data('index');

    var compoundWordCntr = ++(dict[usageIndex].sections[usageSectionCode].itemCntr);
    dict[usageIndex].sections[usageSectionCode].items[compoundWordCntr] = {
        phrase: '',
        meaningCntr: 0,
        meaning: {},
        deletedMeaningIndices: []
    };

    var elemIndex = usageIndex + '-' + compoundWordCntr;
    var $divIndCompoundWord = $('#divIndCompoundWord_x-x').clone();
    $divIndCompoundWord.attr('data-index', elemIndex);
    $divIndCompoundWord.attr('id', 'divIndCompoundWord_' + elemIndex);
    $divIndCompoundWord.find('.btnClsRemoveCompoundWord').first().attr('data-index', elemIndex);
    $divIndCompoundWord.find('.btnClsRemoveCompoundWord').first().attr('id', 'btnRemoveCompoundWord_' + elemIndex);
    $divIndCompoundWord.find('label').html('<font color="#feae3a">' + compoundWordCntr + '. &nbsp; Compound Word</font>');
    $divIndCompoundWord.find('.inpClsCompoundWord').first().attr('data-index', elemIndex);
    $divIndCompoundWord.find('.inpClsCompoundWord').first().attr('id', 'inpCompoundWord_' + elemIndex);
    $divIndCompoundWord.find('.divClsMeaningSection').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndCompoundWord.find('.divClsMeaningSection').first().attr('id', 'divMeaningSection_' + usageSectionCode+'_'+elemIndex);
    $divIndCompoundWord.find('.btnClsAddMeaning').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndCompoundWord.find('.btnClsAddMeaning').first().attr('id', 'btnAddMeaning_' + usageSectionCode+'_'+elemIndex);
    
    $divIndCompoundWord
        .hide()
        .removeClass('hide')
        .appendTo('#divContainerCompoundWords_' + usageIndex)
        .show('fast');
};

function removeCompoundWord(buttonId) {
    // var divId = document.getElementById(buttonId).closest('.divClsIndCompoundWord').id;
    // $('#'+divId).hide('fast', function(){ $('#'+divId).remove(); });
    // compoundWordCntr--;
    var btnDataIndex = $('#'+buttonId).data('index');
    var usageSectionCode = 'cpw';
    var diParts = btnDataIndex.split('-');
    var usageIndex = parseInt(diParts[0]);
    var itemIndex = parseInt(diParts[1]);
    
    // Update dict
    dict[usageIndex].sections[usageSectionCode].items[itemIndex] = {};
    dict[usageIndex].sections[usageSectionCode].deletedItemIndices.push(itemIndex);

    // Remove element from DOM
    $('#divIndCompoundWord_'+btnDataIndex).hide('fast', function(){ this.remove(); });
}

//-~-~-~-~-~-~-~-~-~-~-~-~ Derivatives -~-~-~-~-~-~-~-~-~-~-~-~
function addDerivativeSection(usageIndex) {
    var usageSectionCode = 'drv';

    if (!(usageSectionCode in dict[usageIndex].sections) || 
    jQuery.isEmptyObject(dict[usageIndex].sections[usageSectionCode])) {
        dict[usageIndex].sections[usageSectionCode] = {
            itemCntr: 0,
            items: {},
            deletedItemIndices: []
        };
    }
    var derivativeCntr = ++(dict[usageIndex].sections[usageSectionCode].itemCntr);
    dict[usageIndex].sections[usageSectionCode].items[derivativeCntr] = {
        derivate: '',
        meaningCntr: 0,
        meaning: {},
        deletedMeaningIndices: []
    };

    var $divDerivatives = $('#divDerivatives_x').clone();
    $divDerivatives.attr('data-index', usageIndex);
    $divDerivatives.attr('id', 'divDerivatives_' + usageIndex);
    $divDerivatives.find('.divClsContainerDerivatives').first().attr('data-index', usageIndex);
    $divDerivatives.find('.divClsContainerDerivatives').first().attr('id', 'divContainerDerivatives_' + usageIndex);
    $divDerivatives.find('.btnClsAddMoreDerivative').first().attr('data-index', usageIndex);
    $divDerivatives.find('.btnClsAddMoreDerivatives').first().attr('id', 'btnAddMoreDerivative_' + usageIndex);

    var elemIndex = usageIndex + '-' + derivativeCntr;
    var $divIndDerivative = $('#divIndDerivative_x-x').clone();
    $divIndDerivative.attr('data-index', elemIndex);
    $divIndDerivative.attr('id', 'divIndDerivative_' + elemIndex);
    $divIndDerivative.find('.btnClsRemoveDerivative').first().attr('data-index', elemIndex);
    $divIndDerivative.find('.btnClsRemoveDerivative').first().attr('id', 'btnRemoveDerivative_' + elemIndex);
    $divIndDerivative.find('label').html('<font color="#a638fc">' + derivativeCntr + '. &nbsp; Derivative</font>');
    $divIndDerivative.find('.inpClsDerivative').first().attr('data-index', elemIndex);
    $divIndDerivative.find('.inpClsDerivative').first().attr('id', 'inpDerivative_' + elemIndex);
    $divIndDerivative.find('.divClsMeaningSection').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndDerivative.find('.divClsMeaningSection').first().attr('id', 'divMeaningSection_' + usageSectionCode+'_'+elemIndex);
    $divIndDerivative.find('.btnClsAddMeaning').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndDerivative.find('.btnClsAddMeaning').first().attr('id', 'btnAddMeaning_' + usageSectionCode+'_'+elemIndex);

    $divDerivatives
        .hide()
        .removeClass('hide')
        .appendTo('#divDerivativesPlaceholder_' + usageIndex);
    $divIndDerivative
        .hide()
        .removeClass('hide')
        .appendTo('#divContainerDerivatives_' + usageIndex);
    $divDerivatives.show('fast');
    $divIndDerivative.show('fast');
};

function removeDerivativeSection(usageIndex) {
    // Update dict
    var usageSectionCode = 'drv';
    dict[usageIndex].sections[usageSectionCode] = {};
    
    // Remove element from DOM
    $('#divDerivatives_'+usageIndex).hide('fast', function(){ this.remove(); });
}

function addMoreDerivative(button) {
    var usageSectionCode = 'drv';
    var usageIndex = $('#'+button.id).data('index');
    // var usageIndex = $('#'+button.closest('.divClsDerivatives').id).attr('data-index');
    // console.log(usageIndex);
    // dict[usageIndex].derivativeCntr++;
    // var derivativeCntr = dict[usageIndex].derivativeCntr;
    // var elemIndex = usageIndex + '-' + derivativeCntr;

    var derivativeCntr = ++(dict[usageIndex].sections[usageSectionCode].itemCntr);
    dict[usageIndex].sections[usageSectionCode].items[derivativeCntr] = {
        derivate: '',
        meaningCntr: 0,
        meaning: {},
        deletedMeaningIndices: []
    };

    var elemIndex = usageIndex + '-' + derivativeCntr;
    var $divIndDerivative = $('#divIndDerivative_x-x').clone();
    $divIndDerivative.attr('data-index', elemIndex);
    $divIndDerivative.attr('id', 'divIndDerivative_' + elemIndex);
    $divIndDerivative.find('.btnClsRemoveDerivative').first().attr('data-index', elemIndex);
    $divIndDerivative.find('.btnClsRemoveDerivative').first().attr('id', 'btnRemoveDerivative_' + elemIndex);
    $divIndDerivative.find('label').html('<font color="#a638fc">' + derivativeCntr + '. &nbsp; Derivative</font>');
    $divIndDerivative.find('.inpClsDerivative').first().attr('data-index', elemIndex);
    $divIndDerivative.find('.inpClsDerivative').first().attr('id', 'inpDerivative_' + elemIndex);
    $divIndDerivative.find('.divClsMeaningSection').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndDerivative.find('.divClsMeaningSection').first().attr('id', 'divMeaningSection_' + usageSectionCode+'_'+elemIndex);
    $divIndDerivative.find('.btnClsAddMeaning').first().attr('data-index', usageSectionCode+'_'+elemIndex);
    $divIndDerivative.find('.btnClsAddMeaning').first().attr('id', 'btnAddMeaning_' + usageSectionCode+'_'+elemIndex);
    
    // var $divIndDerivative = $('#divIndDerivative').clone();
    // $divIndDerivative.find('label').html('<font color="#a638fc">' + derivativeCntr + '. &nbsp; Darivative</font>');
    // var inpDerivative = $divIndDerivative.find('#inpDerivative').first();
    // inpDerivative.attr('id', 'inpDerivative_' + elemIndex);
    // inpDerivative.attr('data-index', elemIndex);
    
    $divIndDerivative
        .hide()
        .removeClass('hide')
        .appendTo('#divContainerDerivatives_' + usageIndex)
        .show('fast');
};

function removeDerivative(buttonId) {
    var btnDataIndex = $('#'+buttonId).data('index');
    var usageSectionCode = 'drv';
    var diParts = btnDataIndex.split('-');
    var usageIndex = parseInt(diParts[0]);
    var itemIndex = parseInt(diParts[1]);
    
    // Update dict
    dict[usageIndex].sections[usageSectionCode].items[itemIndex] = {};
    dict[usageIndex].sections[usageSectionCode].deletedItemIndices.push(itemIndex);

    // Remove element from DOM
    $('#divIndDerivative_'+btnDataIndex).hide('fast', function(){ this.remove(); });
}

//-~-~-~-~-~-~-~-~-~-~-~-~ Meaning -~-~-~-~-~-~-~-~-~-~-~-~
function addMeaning(button) {
    var btnDataIndex = $('#'+button.id).data('index');
    var usageSectionCode = btnDataIndex.substring(0,3);
    var diParts = btnDataIndex.substring(4).split('-');
    var usageIndex = parseInt(diParts[0]);
    var itemIndex = parseInt(diParts[1]);
    var meaningCntr = ++(dict[usageIndex].sections[usageSectionCode].items[itemIndex].meaningCntr);
    var elemIndex = usageSectionCode + '_' + usageIndex + '-' + itemIndex + '-' + meaningCntr;

    var $clone = $('#divMeaning_aaa_x-x-x').clone();
    $clone.attr('data-index', elemIndex);
    $clone.attr('id', 'divMeaning_' + elemIndex);
    $clone.find('.btnClsRemoveMeaning').first().attr('data-index', elemIndex);
    $clone.find('.btnClsRemoveMeaning').first().attr('id', 'btnRemoveMeaning_' + elemIndex);
    $clone.find('.inpClsMeaning').first().attr('data-index', elemIndex);
    $clone.find('.inpClsMeaning').first().attr('id', 'inpMeaning_' + elemIndex);
    $clone.find('.inpClsExample').first().attr('data-index', elemIndex);
    $clone.find('.inpClsExample').first().attr('id', 'inpExample_' + elemIndex);
    $clone.find('.btnClsAddSubMeaning').attr('data-index', elemIndex);
    $clone.find('.btnClsAddSubMeaning').attr('id', 'btnAddSubMeaning_' + elemIndex);

    $clone
        .hide()
        .removeClass('hide')
        .insertBefore(button)
        .show('fast');

    dict[usageIndex].sections[usageSectionCode].items[itemIndex].meaning[meaningCntr] = {
        meaning: '',
        example: '',
        subMeaningCntr: 0,
        subMeaning: {},
        deletedSubMeaningIndices: []
    };
};

function removeMeaning(button) {
    var btnDataIndex = $('#'+button.id).data('index');
    var usageSectionCode = btnDataIndex.substring(0, 3);
    var diParts = btnDataIndex.substring(4).split('-');
    var usageIndex = parseInt(diParts[0]);
    var itemIndex = parseInt(diParts[1]);
    var meaningIndex = parseInt(diParts[2]);

    // Update dict - 1)remove meaning, 2)update deleted indices
    // Don't decrease meaningCntr, since that would create duplicate indices after new addition
    dict[usageIndex].sections[usageSectionCode].items[itemIndex].meaning[meaningIndex] = {};
    dict[usageIndex].sections[usageSectionCode].items[itemIndex].deletedMeaningIndices.push(meaningIndex);

    // Remove element from DOM
    $('#divMeaning_'+btnDataIndex).hide('fast', function(){ this.remove(); });
};

//-~-~-~-~-~-~-~-~-~-~-~-~ Sub-meaning -~-~-~-~-~-~-~-~-~-~-~-~
function addSubMeaning(button) {
    var btnDataIndex = $('#'+button.id).data('index');
    var usageSectionCode = btnDataIndex.substring(0, 3);
    var diParts = btnDataIndex.substring(4).split('-');
    var usageIndex = parseInt(diParts[0]);
    var itemIndex = parseInt(diParts[1]);
    var meaningIndex = parseInt(diParts[2]);
    var subMeaningCntr = ++(dict[usageIndex].sections[usageSectionCode].items[itemIndex].meaning[meaningIndex].subMeaningCntr);
    var elemIndex = usageSectionCode + '_' + usageIndex + '-' + itemIndex + '-' + meaningIndex + '-' + subMeaningCntr;

    // var button = document.getElementById(button.id);
    var rootDivId = button.closest('.divClsMeaning').id;

    var $clone = $('#divSubMeaning_aaa_x-x-x-x').clone();
    $clone.attr('data-index', elemIndex);
    $clone.attr('id', 'divSubMeaning_' + elemIndex);

    $clone.find('.inpClsSubMeaning').first().attr('data-index', elemIndex);
    $clone.find('.inpClsSubMeaning').first().attr('id', 'inpSubMeaning_' + elemIndex);
    $clone.find('.inpClsExampleSubMeaning').first().attr('data-index', elemIndex);
    $clone.find('.inpClsExampleSubMeaning').first().attr('id', 'inpExampleSubMeaning_' + elemIndex);
    $clone.find('button').attr('data-index', elemIndex);
    $clone.find('button').attr('id', 'btnRemoveSubMeaning_' + elemIndex);
    $clone
        .hide()
        .removeClass('hide')
        .appendTo('#'+rootDivId)
        .show('fast');;

    dict[usageIndex].sections[usageSectionCode].items[itemIndex].meaning[meaningIndex].subMeaning[subMeaningCntr] = {
        subMeaning: '',
        example: ''
    };
};

function removeSubMeaning(button) {
    var btnDataIndex = $('#'+button.id).data('index');
    var usageSectionCode = btnDataIndex.substring(0, 3);
    var diParts = btnDataIndex.substring(4).split('-');
    var usageIndex = parseInt(diParts[0]);
    var itemIndex = parseInt(diParts[1]);
    var meaningIndex = parseInt(diParts[2]);
    var subMeaningIndex = parseInt(diParts[3]);

    // Update dict - 1)remove sub-meaning, 2)update deleted indices
    // Don't decrease subMeaningCntr, since that would create duplicate indices after new addition
    dict[usageIndex].sections[usageSectionCode].items[itemIndex].meaning[meaningIndex].subMeaning[subMeaningIndex] = {};
    dict[usageIndex].sections[usageSectionCode].items[itemIndex].meaning[meaningIndex].deletedSubMeaningIndices.push(subMeaningIndex);

    $('#divSubMeaning_'+btnDataIndex).hide('fast', function(){ this.remove(); });
};


$(function () {

    $('.btnClsAddUsage').click(function() {
        addUsage(this);
    });

    // $('.chkClsButtonGrp').change(function() {
    //     var usageIndex = $(this).attr('data-index');
    //     if (this.checked) {
    //         this.closest('.btnClsCheckbox').style.backgroundColor = '#d5dbdb';// '#f8c471';
    //         console.log('ABC');
    //         var i = $(this).siblings('i').first();
    //         i.removeClass('fa-plus').addClass('fa-times-circle');
    //         console.log(this.name);
    //         if (this.name == 'phrases') {
    //             i.css('color', '#0000ff');
    //             addPhraseSection(usageIndex);
    //         } else if (this.name == 'phrasalVerbs') {
    //             i.css('color', '#00bb17');
    //             addPhrasalVerbSection(usageIndex);
    //         } else if (this.name == 'compoundWords') {
    //             i.css('color', '#e38600');
    //             addCompoundWordSection(usageIndex);
    //         } else {
    //             i.css('color', '#7d00df');
    //             addDerivativeSection(usageIndex);
    //         }
    //     } else {
    //         this.closest('.btnClsCheckbox').style.backgroundColor = '';
    //         var i = $(this).siblings('i').first();
    //         i.removeClass('fa-times-circle').addClass('fa-plus');
    //         if (this.name == 'phrases') {
    //             i.css('color', '');
    //             removePhraseSection(usageIndex);
    //         } else if (this.name == 'phrasalVerbs') {
    //             i.css('color', '');
    //             removePhrasalVerbSection(usageIndex);
    //         } else if (this.name == 'compoundWords') {
    //             i.css('color', '');
    //             removeCompoundWordSection(usageIndex);
    //         } else {
    //             i.css('color', '');
    //             removeDerivativeSection(usageIndex);
    //         }
    //     }
    // });

    // $('.clsSelectPos').on('change', function () {
    //     var divPosDetailId = '#divPosDetails_' + $(this).attr('data-index');
    //     console.log(divPosDetailId);
    //     if ($(this).val() == 'noun') {
    //         if ($('#divVerb_'+1).length > 0) {
    //             $('#divVerb_'+1).remove();
    //         } else if ($('#divAdj_'+1).length > 0) {
    //             $('#divAdj_'+1).remove();
    //         }
    //         if($('#divNoun_' + posCntr).length == 0) {
    //             var newSP = $('#selectNounType').clone();
    //             newSP.attr('id', 'selectNounType_' + posCntr);
    //             newSP.removeClass('hide');

    //             var clone = $('#divNoun').clone();
    //             clone.find('#inpPlural').first().attr('id', 'inpPlural_' + posCntr);
    //             clone.find('#selectNounType').first().attr('id', 'selectNounType_' + posCntr);
    //             clone
    //                 .hide()
    //                 .removeClass('hide')
    //                 .attr('id', 'divNoun_' + posCntr)
    //                 .appendTo(divPosDetailId)
    //                 .show('fast');
    //             newSP.appendTo(clone.closest('.divClsNoun'));
    //             newSP.selectpicker('refresh');
    //         }
    //     } else if ($(this).val() == 'verb') {
    //         if ($('#divNoun_'+1).length > 0) {
    //             $('#divNoun_'+1).remove();
    //         } else if ($('#divAdj_'+1).length > 0) {
    //             $('#divAdj_'+1).remove();
    //         }
    //         if($('#divVerb_' + posCntr).length == 0) {
    //             var newSP = $('#selectVerbType').clone();
    //             newSP.attr('id', 'selectVerbType_' + posCntr);
    //             newSP.removeClass('hide');

    //             var clone = $('#divVerb').clone();
    //             clone.find('#inp3rdPerson').first().attr('id', 'inp3rdPerson_' + posCntr);
    //             clone.find('#inpPresentCont').first().attr('id', 'inpPresentCont_' + posCntr);
    //             clone.find('#inpPast').first().attr('id', 'inpPast_' + posCntr);
    //             clone.find('#inpPastPart').first().attr('id', 'inpPastPart_' + posCntr);
    //             clone
    //                 .hide()
    //                 .removeClass('hide')
    //                 .attr('id', 'divVerb_' + posCntr)
    //                 .appendTo(divPosDetailId)
    //                 .show('fast');
    //             newSP.appendTo(clone.find('.divClsType').first());
    //             newSP.selectpicker('refresh');
    //         }
    //     } else if ($(this).val() == 'adj') {
    //         if ($('#divNoun_'+1).length > 0) {
    //             $('#divNoun_'+1).remove();
    //         } else if ($('#divVerb_'+1).length > 0) {
    //             $('#divVerb_'+1).remove();
    //         }
    //         if($('#divAdj_' + posCntr).length == 0) {
    //             var clone = $('#divAdj').clone();
    //             clone.find('#inpComparative').first().attr('id', 'inpComparative_' + posCntr);
    //             clone.find('#inpSuperlative').first().attr('id', 'inpSuperlative_' + posCntr);
    //             clone
    //                 .hide()
    //                 .removeClass('hide')
    //                 .attr('id', 'divAdj_' + posCntr)
    //                 .appendTo(divPosDetailId)
    //                 .show('fast');
    //         }
    //     } else {
    //         if ($('#divNoun_'+1).length > 0) {
    //             $('#divNoun_'+1).hide('fast', function(){ $(this).remove(); });
    //         } else if ($('#divVerb_'+1).length > 0) {
    //             $('#divVerb_'+1).hide('fast', function(){ $(this).remove(); });
    //         } else if ($('#divAdj_'+1).length > 0) {
    //             $('#divAdj_'+1).hide('fast', function(){ $(this).remove(); });
    //         }
    //     }
        
    //     // if($(this).attr('name')=='name2'){
    //     //     $(".selectpicker[name='name1']").val(/*set value*/);
    //     // }
    //     // else{
    //     //     $(".selectpicker[name='name2']").val(/*set value*/);
    //     // }
    // });

    //-~-~-~-~-~-~-~-~-~-~-~-~ Form Submission -~-~-~-~-~-~-~-~-~-~-~-~
    $('#formAddNew').on('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(dict);
        return;
        $('#submit').addClass('active');
        

        var data = {};
        data.shopLocation = $('#shopLocation').val();
        data.startDate = startDateEpoch;
        data.endDate = endDateEpoch;
        data.noOfRecoms = $('#noOfRecoms').val();

        console.log(data);

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/addnew',
            data: data,
            dataType: 'json',
            timeout: 10000,   // 10 seconds timeout
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('--- Request failed or timed out ---');
                console.log(textStatus);
                console.log(errorThrown);
                $('#submit').removeClass('active');
            },
            success: function(result) {
                console.log('data: ', JSON.stringify(result));
                if (result.success == 'true'){
                    generateTable(result.topN);
                } else {
                    //console.log('ABC');
                    //- window.divRecom.style.visibility = 'visible';
                    document.getElementById('header').innerHTML = 'Failed to get any recommendations!';
                    $('#submit').removeClass('active');
                }
            }
        });
    })
});