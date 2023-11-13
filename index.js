/* Sidebar */

document.getElementById('intro').style.cursor = 'pointer';
document.getElementById('questionnaire').style.cursor = 'pointer';
document.getElementById('results').style.cursor = 'pointer';
document.getElementById('support').style.cursor = 'pointer';

const ID = [0, 1, 2, 3];
const sidebar = ["introButton", "questionnaireButton", "resultsButton", "supportButton"];
const mainBody = ["introMainBody", "questionnaireMainBody", "resultsMainBody", "supportMainBody"];

document.getElementById('introButton').addEventListener('click', function() {sidebarClassName(0)});
document.getElementById('questionnaireButton').addEventListener('click', function() {sidebarClassName(1)});
document.getElementById('resultsButton').addEventListener('click', function() {sidebarClassName(2)});
document.getElementById('supportButton').addEventListener('click', function() {sidebarClassName(3)});
function sidebarClassName(id) {
    for (const i of ID) {
        document.getElementById(sidebar[i]).className = "sideButton";
        document.getElementById(mainBody[i]).style.display = "none";
    }
    document.getElementById(sidebar[id]).className = "sideButtonOnClick";
    document.getElementById(mainBody[id]).style.display = "flex";
    document.getElementById(mainBody[id]).scrollTop = 0;
}


/* Intro Main Body */

document.getElementById('getStartButton').style.cursor = 'pointer';
document.getElementById('getStartButton').addEventListener('mouseenter',
    function() {document.getElementById('getStartButton').className = "getStartButtonOnClick";});
document.getElementById('getStartButton').addEventListener('mouseleave',
    function() {document.getElementById('getStartButton').className = "getStartButton";});
document.getElementById('getStartButton').addEventListener('click',
    function () {sidebarClassName(1)});


/* Questionnaire Main Body */

function questionnaireMainBodyBackTop() {
    document.getElementById('questionnaireMainBody').scrollTop = 0;
}

<!-- Input div of number of attributes -->

document.getElementById('NoASubmitButton').style.cursor = 'pointer';
document.getElementById('NoASubmitButton').addEventListener('mouseenter',
    function() {document.getElementById('NoASubmitButton').className = "NoASubmitButtonOnClick";});
document.getElementById('NoASubmitButton').addEventListener('mouseleave',
    function() {document.getElementById('NoASubmitButton').className = "NoASubmitButton";});
document.getElementById('NoASubmitButton').addEventListener('click', function () {checkNoAInput(); questionnaireMainBodyBackTop();});

function closeNoAInputStatus() {
    document.getElementById('NoAInputStatus').style.visibility = "hidden";
}

function showNoAInputStatus() {
    document.getElementById('NoAInputStatus').style.visibility = "visible";
}

function NoAInputCheckNoAs() {
    var NoAs = document.getElementById('NoAs').value;
    if (NoAs === "") {
        document.getElementById('NoAs').placeholder = "Cannot be empty!";
        return false;
    } else if (NoAs <= 0 || NoAs % 1 !== 0) {
        document.getElementById('NoAs').value = "";
        document.getElementById('NoAs').placeholder = "Invalid input!";
        return false;
    }
    return true;
}

function NoAInputCheckNoEFDs() {
    var NoEFDs = document.getElementById('NoEFDs').value;
    if (NoEFDs === "") {
        document.getElementById('NoEFDs').placeholder = "Cannot be empty!";
        return false;
    } else if (NoEFDs < 0 || NoEFDs % 1 !== 0) {
        document.getElementById('NoEFDs').value = "";
        document.getElementById('NoEFDs').placeholder = "Invalid input!";
        return false;
    }
    return true;
}

function checkNoAInput() {
    var NoAs = NoAInputCheckNoAs();
    var NoEFDs = NoAInputCheckNoEFDs();
    if (NoAs && NoEFDs) {
        var NoAs = document.getElementById('NoAs').value;
        var NoEFDs = document.getElementById('NoEFDs').value;
        closeNoAInputStatus();
        showDVsInputStatus(parseInt(NoAs), parseInt(NoEFDs));
    }
}

<!-- Input div of domain values -->

const DVsAreaOriginInnerHTML = document.getElementById('DVsArea').innerHTML;
const ExistingFDsAreaOriginInnerHTML = document.getElementById('ExistingFDsArea').innerHTML;
var attributeNames = [];
var existingFDsX = [];
var existingFDsY = [];
var domainValue0 = []
var domainValue1 = []

document.getElementById('BackToNoAInputStatusButton').style.cursor = 'pointer';
document.getElementById('BackToNoAInputStatusButton').addEventListener('mouseenter',
    function() {document.getElementById('BackToNoAInputStatusButton').className = "BackToNoAInputStatusButtonOnClick";});
document.getElementById('BackToNoAInputStatusButton').addEventListener('mouseleave',
    function() {document.getElementById('BackToNoAInputStatusButton').className = "BackToNoAInputStatusButton";});
document.getElementById('BackToNoAInputStatusButton').addEventListener('click',
    function () {closeDVsInputStatus(); showNoAInputStatus(); questionnaireMainBodyBackTop();
        document.getElementById('ExistingFDsArea').innerHTML = ExistingFDsAreaOriginInnerHTML;});

document.getElementById('DVsSubmitButton').style.cursor = 'pointer';
document.getElementById('DVsSubmitButton').addEventListener('mouseenter',
    function() {document.getElementById('DVsSubmitButton').className = "DVsSubmitButtonOnClick";});
document.getElementById('DVsSubmitButton').addEventListener('mouseleave',
    function() {document.getElementById('DVsSubmitButton').className = "DVsSubmitButton";});
document.getElementById('DVsSubmitButton').addEventListener('click',
    function () {storeAttributeNamesAndFDs();
    if (checkDomainValuesInput()) {
        closeDVsInputStatus();
        showQAStatus();
        questionnaireMainBodyBackTop();
        generateQuestions();
    }});

function showDVsInputStatus(NoAs, NoEFDs) {
    document.getElementById('DVsInputStatus').style.visibility = "visible";
    document.getElementById('NoAsValue').innerText = NoAs;
    attributeNames = []
    existingFDsX = []
    existingFDsY = []
    domainValue0 = []
    domainValue1 = []

    var newLine = ""
    for (let i = 1; i <= NoAs; i++) {
        domainValue0ID = "domainValue0" + i;
        domainValue1ID = "domainValue1" + i;
        domainValue0.push(0);
        domainValue1.push(1);
        id = "attribute" + i;
        placeholderContent = "Attribute" + i;
        attributeNames.push(placeholderContent);
        newLine += "<div class = \"table\">\n" +
            "                            <textarea id = " + domainValue0ID + " class = \"columnOneTextarea\" placeholder = " + domainValue0[i - 1] + "></textarea>\n" +
            "                            <textarea id = " + domainValue1ID + " class = \"columnTwoTextarea\" placeholder = " + domainValue1[i - 1] + "></textarea>\n" +
            "                            <textarea id = " + id + " class = \"columnThreeTextarea\" placeholder = " + placeholderContent + "></textarea>\n" +
            "                        </div>"
    }
    document.getElementById('DVsArea').innerHTML = DVsAreaOriginInnerHTML + newLine;
    document.getElementById('DVsSubmitButtonArea').style.top = "-120px";

    if (NoEFDs !== 0) {
        document.getElementById('NoEFDsValue').innerText = NoEFDs;
        document.getElementById('DVsInputStatusSequence').innerText = "1. "
        document.getElementById('ExistingFDs').style.display = "inline";
        document.getElementById('ExistingFDsDescribe').style.visibility = "visible";
        document.getElementById('ExistingFDsNote').style.visibility = "visible";

        var newLine = ""
        for (let i = 1; i <= NoEFDs; i++) {
            idX = "FDsX" + i;
            idY = "FDsY" + i;
            newLine += "<div class = \"table\" style = \"font-size: 20px; height: 45px;\">\n" +
                "                                <div class = \"columnOne\">Functional Dependency " + i + "</div>\n" +
                "                                <textarea id = " + idX + " class = \"columnTwoTextarea\" placeholder = \"Please input in this format: 1, 2.\"></textarea>\n" +
                "                                <textarea id = " + idY + " class = \"columnThreeTextarea\" placeholder = \"Please input in this format: 1, 2.\"></textarea>\n" +
                "                            </div>";
        }
        document.getElementById('ExistingFDsArea').innerHTML = ExistingFDsAreaOriginInnerHTML + newLine;
        document.getElementById('DVsSubmitButtonArea').style.top = "80px";
    }
}

function closeDVsInputStatus() {
    document.getElementById('DVsInputStatus').style.visibility = "hidden";
    document.getElementById('DVsInputStatusSequence').innerText = "";
    document.getElementById('ExistingFDs').style.display = "block";
    document.getElementById('ExistingFDsDescribe').style.visibility = "hidden";
    document.getElementById('ExistingFDsNote').style.visibility = "hidden";
}

function checkDomainValuesInput() {
    var NoEFDs = document.getElementById('NoEFDs').value;
    var status = true;
    if (NoEFDs !== 0) {
        for (let i = 1; i <= NoEFDs; i++) {
            idX = "FDsX" + i;
            idY = "FDsY" + i;
            var FDsX = document.getElementById(idX).value;
            var FDsY = document.getElementById(idY).value;
            if (FDsX === "") {
                document.getElementById(idX).placeholder = "Cannot be empty";
                status = false;
            }
            if (FDsY === "") {
                document.getElementById(idY).placeholder = "Cannot be empty";
                status = false;
            }
        }
    }
    return status;
}

function storeAttributeNamesAndFDs() {
    var NoAs = document.getElementById('NoAs').value;
    var NoEFDs = document.getElementById('NoEFDs').value;

    for (let i = 1; i <= NoAs; i++) {
        domainValue0ID = "domainValue0" + i;
        domainValue1ID = "domainValue1" + i;
        var domainValue0Value = document.getElementById(domainValue0ID).value;
        var domainValue1Value = document.getElementById(domainValue1ID).value;
        if (domainValue0Value !== "") {
            domainValue0[i - 1] = (domainValue0Value);
        }
        if (domainValue1Value !== "") {
            domainValue1[i - 1] = (domainValue1Value);
        }
        id = "attribute" + i;
        var attributeValue = document.getElementById(id).value;
        if (attributeValue !== "") {
            attributeNames[i - 1] = (attributeValue);
        }
    }

    if (NoEFDs !== 0) {
        for (let i = 1; i <= NoEFDs; i++) {
            idX = "FDsX" + i;
            idY = "FDsY" + i;
            existingFDsX.push(document.getElementById(idX).value);
            existingFDsY.push(document.getElementById(idY).value);
        }
    }
}

var R = 0
var maxSet = []
var askedQ = [];
var FDs = []
var finalFDs = []
var Y = []
var position = [-1]

async function generateQuestions(){
    var NoAs = document.getElementById('NoAs').value;
    var NoEFDs = document.getElementById('NoEFDs').value;
    NoAs = parseInt(NoAs)
    NoEFDs = parseInt(NoEFDs)

    var res = await eel.initiaise(NoAs)();
    R = res.R;
    maxSet = res.maxSet;
    FDs = res.FDs;
    position = [-1];

    for (let i = 0; i < NoAs; i++) {
        askedQ.push([])
    }

    if (NoEFDs !== 0) {
        for (let i = 0; i < NoEFDs; i++) {
            Y = existingFDsX[i].split(',').map((num) => {return Number(num)});
            attributeIndex = parseInt(existingFDsY[i]);
            var res = await eel.updateMax(R, maxSet, FDs, attributeIndex, Y)();
            maxSet = res.maxSet;
            FDs = res.FDs;
        }
    }

    var res = await eel.showNonRedundantFDs(FDs)()
    finalFDs = res.finalFDs

    loop(NoAs, maxSet, askedQ, position)
}

<!-- Questionnaire and Results -->

document.getElementById('BackToDVsInputStatusButton').style.cursor = 'pointer';
document.getElementById('BackToDVsInputStatusButton').addEventListener('mouseenter',
    function() {document.getElementById('BackToDVsInputStatusButton').className = "BackToDVsInputStatusButtonOnClick";});
document.getElementById('BackToDVsInputStatusButton').addEventListener('mouseleave',
    function() {document.getElementById('BackToDVsInputStatusButton').className = "BackToDVsInputStatusButton";});
document.getElementById('BackToDVsInputStatusButton').addEventListener('click',
    function () {closeQAStatus();
    document.getElementById('DVsInputStatus').style.visibility = "visible";
    document.getElementById('ExistingFDs').style.display = "block";
    document.getElementById('ExistingFDsDescribe').style.visibility = "hidden";
    document.getElementById('ExistingFDsNote').style.visibility = "hidden";
    var NoEFDs = document.getElementById('NoEFDs').value;
    if (parseInt(NoEFDs) !== 0) {
        document.getElementById('ExistingFDs').style.display = "inline";
        document.getElementById('ExistingFDsDescribe').style.visibility = "visible";
        document.getElementById('ExistingFDsNote').style.visibility = "visible";
    }
    document.getElementById('QMInputData').innerText = "1. Input Data";
    questionnaireMainBodyBackTop();});

function closeQAStatus() {
    document.getElementById('QAStatus').style.visibility = "hidden";
}

function showQAStatus() {
    document.getElementById('QMInputData').innerText = "2. Questionnaire";
    document.getElementById('QAStatus').style.visibility = "visible";
    document.getElementById('attributeArray').innerText = getAttribtueNames();
}

function getAttribtueNames() {
    var NoAs = document.getElementById('NoAs').value;
    var attributeNamesStr = "[";
    for (let i = 0; i < NoAs - 1; i++) {
        attributeNamesStr = attributeNamesStr + i + ": '" + attributeNames[i] + "', ";
    }
    attributeNamesStr = attributeNamesStr + (NoAs - 1) + ": '" + attributeNames[attributeNames.length - 1] + "']"
    return attributeNamesStr
}

document.getElementById('QuestionTableYes').style.cursor = 'pointer';
document.getElementById('QuestionTableYes').addEventListener('mouseenter',
    function() {document.getElementById('QuestionTableYes').className = "QuestionTableYesOnClick";});
document.getElementById('QuestionTableYes').addEventListener('mouseleave',
    function() {document.getElementById('QuestionTableYes').className = "QuestionTableYes";});
document.getElementById('QuestionTableYes').addEventListener('click',  function () {
    var NoAs = document.getElementById('NoAs').value;
    NoAs = parseInt(NoAs);

    if (position.length === (NoAs + 1)) {
        if ((position[NoAs - 1] + 1) === maxSet[NoAs - 1].length) {
            showResults();
        }
    }

    loop(NoAs, maxSet, askedQ, position)
});

document.getElementById('QuestionTableNo').style.cursor = 'pointer';
document.getElementById('QuestionTableNo').addEventListener('mouseenter',
    function() {document.getElementById('QuestionTableNo').className = "QuestionTableNoOnClick";});
document.getElementById('QuestionTableNo').addEventListener('mouseleave',
    function() {document.getElementById('QuestionTableNo').className = "QuestionTableNo";});
document.getElementById('QuestionTableNo').addEventListener('click', async function () {
    var NoAs = document.getElementById('NoAs').value
    NoAs = parseInt(NoAs)

    if (position[position.length - 1] === -1) {
        position.pop();
    }
    attributeIndex = position.length - 1;
    Y = maxSet[attributeIndex][position[attributeIndex]];

    var res = await eel.updateMax(R, maxSet, FDs, attributeIndex, Y)()
    maxSet = res.maxSet
    FDs = res.FDs
    position = [-1]

    var res = await eel.showNonRedundantFDs(FDs)()
    finalFDs = res.finalFDs

    loop(NoAs, maxSet, askedQ, position)
});

function loop(NoAs, maxSet, askedQ, position) {
    if (FDs.every( function (a) { return !a.length })) {
        FDsArea = "<div class = \"FDsAreaText\">" + "(The current set of functional dependencies is devoid of any elements.)\n" + "</div>\n";
    } else {
        var FDsText = "";
        var X = "";
        var Y = "";
        for (let i = 0; i < finalFDs.length; i++) {
            if (i % 2 === 0) {
                X = "";
                if (finalFDs[i].length === 0) {
                    X = "Empty set "
                } else {
                    for (e of finalFDs[i]) {
                        X += attributeNames[e] + " "
                    }
                }
            } else {
                Y = "";
                for (e of finalFDs[i]) {
                    Y += attributeNames[e] + " "
                }
                FDsText += "<div class = \"FDsAreaText\">" + X + "--> " + Y + "</div>\n";
            }
        }
        FDsArea = FDsText;
    }
    MaxSetArea = ""
    for (let attribute = 0; attribute < NoAs; attribute++) {
        var MaxSetText = "";
        if (maxSet[attribute].length > 0) {
            MaxSetText += attributeNames[attribute] + ": "
            for (let index = 0; index < maxSet[attribute].length - 1; index++) {
                if (maxSet[attribute][index].length > 0) {
                    if (maxSet[attribute][index].length > 1) {
                        MaxSetText += "{" + attributeNames[maxSet[attribute][index][0]] + ", "
                        for (let i = 1; i < maxSet[attribute][index].length - 1; i++) {
                            MaxSetText += attributeNames[maxSet[attribute][index][i]] + ", "
                        }
                        MaxSetText += attributeNames[maxSet[attribute][index][maxSet[attribute][index].length - 1]] + "}"
                    } else {
                        MaxSetText += "{" + attributeNames[maxSet[attribute][index][0]] + "}"
                    }
                } else {
                    MaxSetText += "{Empty Set}"
                }
                MaxSetText += ", "
            }
            index = maxSet[attribute].length - 1
            if (maxSet[attribute][index].length > 0) {
                if (maxSet[attribute][index].length > 1) {
                    MaxSetText += "{" + attributeNames[maxSet[attribute][index][0]] + ", "
                    for (let i = 1; i < maxSet[attribute][index].length - 1; i++) {
                        MaxSetText += attributeNames[maxSet[attribute][index][i]] + ", "
                    }
                    MaxSetText += attributeNames[maxSet[attribute][index][maxSet[attribute][index].length - 1]] + "}"
                } else {
                    MaxSetText += "{" + attributeNames[maxSet[attribute][index][0]] + "}"
                }
            } else {
                MaxSetText += "{Empty Set}"
            }
            MaxSetArea += "<div class = \"MaxSetArea\">" + MaxSetText + "</div>\n"
        }
    }

    var QAResultAreaInnerHTML = "<div>The set of functional dependencies that is presently obtained.</div>" +
        FDsArea +
        "                            <div style = \"height: 20px; width: 100%;\"></div>" +
        "                            <div>Maximal Sets</div>\n" +
        MaxSetArea
    document.getElementById("QAResultArea").innerHTML = QAResultAreaInnerHTML;

    loop1:
        for (let attribute = 0; attribute < NoAs; attribute++) {
            if (maxSet[attribute].length != 0) {
                for (let index = 0; index < maxSet[attribute].length; index++) {
                    if (position[attribute] < index) {
                        var ms = maxSet[attribute][index];
                        text = ""
                        for (let i = 0; i < (ms.length - 1); i++) {
                            text += attributeNames[ms[i]] + ", "
                        }
                        text += attributeNames[ms[ms.length - 1]]
                        if (ms.length !== 0) {
                            if (askedQ[attribute].includes(text) === false) {
                                document.getElementById("Question").innerText = "2. Is it feasible that there " +
                                    "exist two records in which the values for attributes " + text +
                                    " are identical, while the values for attribute " + attributeNames[attribute] + " are dissimilar?"

                                var QuestionAreaTableSizeInnerHtml = "<col span=\"1\">\n"
                                var QuestionAreaTable1stRowInnerHtml = ""
                                var QuestionAreaTable2ndRowInnerHtml = ""
                                var QuestionAreaTable3rdRowInnerHtml = ""

                                for (let i = 0; i < ms.length; i++) {
                                    QuestionAreaTableSizeInnerHtml += QuestionAreaTableSizeInnerHtml
                                    QuestionAreaTable1stRowInnerHtml += "<th>" + attributeNames[ms[i]] + "</th>\n"
                                    QuestionAreaTable2ndRowInnerHtml += "<td>" + domainValue0[ms[i]] + "</td>\n"
                                    QuestionAreaTable3rdRowInnerHtml += "<td>" + domainValue0[ms[i]] + "</td>\n"
                                }

                                QuestionAreaTableSizeInnerHtml += QuestionAreaTableSizeInnerHtml
                                QuestionAreaTable1stRowInnerHtml += "<th>" + attributeNames[attribute] + "</th>\n"
                                QuestionAreaTable2ndRowInnerHtml += "<td>" + domainValue0[attribute] + "</td>\n"
                                QuestionAreaTable3rdRowInnerHtml += "<td>" + domainValue1[attribute] + "</td>\n"

                                var QuestionAreaTableInnerHtml = "<colgroup>\n" + QuestionAreaTableSizeInnerHtml +
                                    "                                </colgroup>\n" +
                                    "                                <tbody>\n" +
                                    "                                    <tr>\n" + QuestionAreaTable1stRowInnerHtml +
                                    "                                    </tr>\n" +
                                    "                                    <tr>\n" + QuestionAreaTable2ndRowInnerHtml +
                                    "                                    </tr>\n" +
                                    "                                    <tr>\n" + QuestionAreaTable3rdRowInnerHtml +
                                    "                                    </tr>\n" +
                                    "                                </tbody>"

                                document.getElementById('QuestionAreaTable').innerHTML = QuestionAreaTableInnerHtml;
                                askedQ[attribute].push(text);
                                position[attribute] += 1
                                if (position[attribute] === (maxSet[attribute].length) - 1){
                                    position.push(-1)
                                }
                                break loop1
                            }
                        } else {
                            if (askedQ[attribute].includes(text) === false) {
                                document.getElementById("Question").innerText = "2. Is it feasible that there exist " +
                                    "two records in which the values on attribute " + attributeNames[attribute] + " do not match?"

                                var QuestionAreaTableSizeInnerHtml = "<col span=\"1\">\n"
                                var QuestionAreaTable1stRowInnerHtml = ""
                                var QuestionAreaTable2ndRowInnerHtml = ""
                                var QuestionAreaTable3rdRowInnerHtml = ""

                                QuestionAreaTableSizeInnerHtml += QuestionAreaTableSizeInnerHtml
                                QuestionAreaTable1stRowInnerHtml += "<th>" + attributeNames[attribute] + "</th>\n"
                                QuestionAreaTable2ndRowInnerHtml += "<td>" + domainValue0[attribute] + "</td>\n"
                                QuestionAreaTable3rdRowInnerHtml += "<td>" + domainValue1[attribute] + "</td>\n"

                                var QuestionAreaTableInnerHtml = "<colgroup>\n" + QuestionAreaTableSizeInnerHtml +
                                    "                                </colgroup>\n" +
                                    "                                <tbody>\n" +
                                    "                                    <tr>\n" + QuestionAreaTable1stRowInnerHtml +
                                    "                                    </tr>\n" +
                                    "                                    <tr>\n" + QuestionAreaTable2ndRowInnerHtml +
                                    "                                    </tr>\n" +
                                    "                                    <tr>\n" + QuestionAreaTable3rdRowInnerHtml +
                                    "                                    </tr>\n" +
                                    "                                </tbody>"

                                document.getElementById('QuestionAreaTable').innerHTML = QuestionAreaTableInnerHtml;
                                askedQ[attribute].push(text);
                                position[attribute] += 1
                                if (position[attribute] === (maxSet[attribute].length) - 1) {
                                    position.push(-1)
                                }
                                break loop1
                            }
                        }
                        position[attribute] += 1
                        if (position[attribute] === (maxSet[attribute].length) - 1){
                            position.push(-1)
                        }
                    }
                }
            } else {
                position.push(-1)
            }
        }

    if (position.length === (NoAs + 1)) {
        if (position[NoAs - 1] === -1) {
            showResults()
        }
    }
}


/* Results Main Body */

document.getElementById('resultsMainBodyButton').style.cursor = 'pointer';
document.getElementById('resultsMainBodyButton').addEventListener('mouseenter',
    function() {document.getElementById('resultsMainBodyButton').className = "resultsMainBodyButtonOnClick";});
document.getElementById('resultsMainBodyButton').addEventListener('mouseleave',
    function() {document.getElementById('resultsMainBodyButton').className = "resultsMainBodyButton";});
document.getElementById('resultsMainBodyButton').addEventListener('click', function () {
    location.reload();
});

const resultsMainBodyAreaPOriginal = document.getElementById('resultsMainBodyAreaP').innerHTML;

function showResults() {
    sidebarClassName(2);
    document.getElementById('resultsMainBodyDefaultHeading').style.visibility = "hidden";
    document.getElementById('resultsMainBodyDefaultArea').style.visibility = "hidden";
    document.getElementById('resultsMainBodyDefaultImg').style.visibility = "hidden";
    document.getElementById('resultsMainBodyHeading').style.visibility = "visible";
    if (FDs.every( function (a) { return !a.length })) {
        document.getElementById('resultsMainBodyAreaN').style.visibility = "visible";
    } else {
        var resultsMainBodyAreaPNew = "";
        var X = "";
        var Y = "";
        for (let i = 0; i < finalFDs.length; i++) {
            if (i % 2 === 0) {
                X = "";
                if (finalFDs[i].length === 0) {
                    X = "Empty set "
                } else {
                    for (e of finalFDs[i]) {
                        X += attributeNames[e] + " "
                    }
                }
            } else {
                Y = "";
                for (e of finalFDs[i]) {
                    Y += attributeNames[e] + " "
                }
                resultsMainBodyAreaPNew += "<div class = \"table\">\n" +
                    "                    <div class = \"columnOne\">" + X + "</div>\n" +
                    "                    <div class = \"columnTwo\">" + Y + "</div>\n" +
                    "                </div>"
            }
        }

        document.getElementById('resultsMainBodyAreaP').innerHTML = resultsMainBodyAreaPOriginal + resultsMainBodyAreaPNew;
        document.getElementById('resultsMainBodyAreaP').style.visibility = "visible";
    }
}


/* Support Main Body */

document.getElementById('reportAreaSubmitButton').style.cursor = 'pointer';
document.getElementById('reportAreaSubmitButton').addEventListener('mouseenter',
    function() {document.getElementById('reportAreaSubmitButton').className = "reportAreaSubmitButtonOnClick";});
document.getElementById('reportAreaSubmitButton').addEventListener('mouseleave',
    function() {document.getElementById('reportAreaSubmitButton').className = "reportAreaSubmitButton";});
document.getElementById('reportAreaSubmitButton').addEventListener('click', function () {
    var reportAreaMainBody = reportAreaMainBodyInputCheck();
    var reportAreaName = reportAreaNameInputCheck();
    var reportAreaEmail = reportAreaEmailInputCheck();
    if (reportAreaMainBody && reportAreaName && reportAreaEmail) {
        alert("Successful! Thanks！");
    }
});

function reportAreaMainBodyInputCheck() {
    var value = document.getElementById('reportAreaMainBody').value;
    if (value === "") {
        document.getElementById('reportAreaMainBody').placeholder = "Describe the problem... (Cannot be empty!)";
        return false;
    }
    return true;
}

function reportAreaNameInputCheck() {
    var value = document.getElementById('reportAreaName').value;
    if (value === "") {
        document.getElementById('reportAreaName').placeholder = "Your Name (Cannot be empty!)";
        return false;
    }
    return true;
}

function reportAreaEmailInputCheck() {
    var value = document.getElementById('reportAreaEmail').value;
    if (value === "") {
        document.getElementById('reportAreaEmail').placeholder = "Your Email (Cannot be empty!)";
        return false;
    }
    return true;
}