// helper.js - All helper functions

var exports = module.exports = {};

// Processes dictionary object sent by front-end to prepare it for inserting into database.
exports.processInputDict = function(dict) {
    var mainWord = dict.mainWord;
    if ('deletedUsageIndices' in dict) {
        dict.usageCntr -= dict.deletedUsageIndices.length;
        delete dict['deletedUsageIndices'];
    }
    for (var i = 1; i <= dict.usageCntr; i++) {
        for (var sectionCode in dict.usages[i].sections) {
            if ('deletedItemIndices' in dict.usages[i].sections[sectionCode]) {
                dict.usages[i].sections[sectionCode].itemCntr -= dict.usages[i].sections[sectionCode].deletedItemIndices.length;
                delete dict.usages[i].sections[sectionCode]['deletedItemIndices'];
            }
            for (var j = 1; j <= dict.usages[i].sections[sectionCode].itemCntr; j++) {
                if ('deletedMeaningIndices' in dict.usages[i].sections[sectionCode].items[j]) {
                    dict.usages[i].sections[sectionCode].items[j].meaningCntr -= dict.usages[i].sections[sectionCode].items[j].deletedMeaningIndices.length;
                    delete dict.usages[i].sections[sectionCode].items[j]['deletedMeaningIndices'];
                }
                for (var k = 1; k <= dict.usages[i].sections[sectionCode].items[j].meaningCntr; k++) {
                    if ('deletedSubMeaningIndices' in dict.usages[i].sections[sectionCode].items[j].meanings[k]) {
                        dict.usages[i].sections[sectionCode].items[j].meanings[j].subMeaningCntr -= dict.usages[i].sections[sectionCode].items[j].meanings[k].deletedSubMeaningIndices.length;
                        delete dict.usages[i].sections[sectionCode].items[j].meanings[k]['deletedSubMeaningIndices'];
                    }
                }
            }
        }
    }
    return dict;
}
