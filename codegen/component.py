import sys

print (sys.argv[1:])

name = sys.argv[1]
path = sys.argv[2] + '/'


fo = open(path + name + '.js', "w")
str = "test"
fo.write('import React , { useState, useEffect } from "react";\n')
fo.write('import { StyleSheet, Text, View } from "react-native";\n\n')
fo.write('const %s = () => {\n'%(name))
fo.write('  return (\n')
fo.write('    <View>\n')
fo.write('      <Text>%s</Text>\n'%(name))
fo.write('    </View>\n')
fo.write('  );\n')
fo.write('};\n\n')
fo.write('export default %s;'%(name))

fo.close()


