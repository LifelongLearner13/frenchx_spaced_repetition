import re
# Ugly but functional script to transform the contence of a text file information
# JS object syntax. I did not commit word file due to copy right concerns.
# Definitions come from: http://www.completewermosguide.com/huttdictionary.html
lineNumber = 0
result = ""
with open('basic_huttese_dictionary.txt', encoding='utf-8') as aFile:
    for aLine in aFile:
        lineNumber += 1
        word = aLine[0:aLine.find("(")].strip()
        word = re.sub('\'', '\\\'', word)
        pron = aLine[aLine.find("(")+1:aLine.find(")")-1].strip()
        pos = re.search("(?<=\))[^\.|^\d]*(?=\.)", aLine)
        if not pos:
            pos = ""
        else:
            pos = pos.group(0).strip()
        definition = aLine[re.search("[1-9]", aLine).start():]
        definition = re.search("[^\(]*", definition).group(0).strip()
        definition = re.sub('\'', '\\\'', definition)
        result += "{{visibleWord: \'{}\', translation: \'{}\', pronunciation: \'{}\', partOfSpeach: \'{}\'}}, ".format(word, definition, pron, pos)
print(result)
