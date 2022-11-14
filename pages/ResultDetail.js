import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList, StatusBar, TouchableOpacity} from "react-native";
import { Table, Row, Rows, Col, Cols, TableWrapper} from "react-native-table-component";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";
import Carousel from 'react-native-snap-carousel';
import { SearchText } from "../axios/api"




const ResultDetail = ({ navigation: { navigate }, route: { params } }) => {

    useEffect(() => {  
  

          console.log("upup")
          
            
          console.log(params.trademarkDetail)
    
          console.log("d") 

    }, [params]);
    
    return (
        <Background>
            <Scroll>
                <View>
                    <View style={{ height: "40%", alignItems: "center", justifyContent: "center", backgroundColor: '#FFFFFF' }}>
                        <Image source={{
                    uri:
                      "http://140.112.106.88:8082/"
                      + params.trademarkDetail["_source"]["tmark-image-url_1"]

                     }}
                   style={{ resizeMode: "contain", width: "75%", height: "90%" }} />
                    </View>
                    <View style={{ height: "60%", backgroundColor: 'FFFFFF' }}>

                        <Table style={{ backgroundColor: 'FFFFFF' }} borderStyle={{ borderWidth: 1, borderColor: '#1E1F20' }}>
                        <TableWrapper>

                        
                        <Row flexArr={[1.2, 2]} data={[" 申請案號", params.trademarkDetail["_source"]["appl-no"]]} textStyle={{ marginLeft: 4 }} />    
                        <Row flexArr={[1.2, 2]} data={[" 商標名稱", params.trademarkDetail["_source"]["tmark-name"]]} textStyle={{ marginLeft: 4 }} />
                        <Row flexArr={[1.2, 2]} data={[" 申請日期", params.trademarkDetail["_source"]["appl-date"]]} textStyle={{ marginLeft: 4 }} />
                        </TableWrapper> 
                            <TableWrapper  style={{flexDirection: 'row'}}>
                            <Col data={["申請人"]} style={{fle: 'row'}}/>
                            <Row data={["中文名稱", params.trademarkDetail["_source"]["appl-date"]]} textStyle={{ marginLeft: 4 }}/>
                            <Row data={["地址", params.trademarkDetail["_source"]["applicant-address"]]} textStyle={{ marginLeft: 4 }}/>
                            <Row data={["國籍", params.trademarkDetail["_source"]["applicant-chinese-country-nam"]]} textStyle={{ marginLeft: 4 }}/>

                            {/* <Row data={[" 商標地址", params.trademarkDetail["_source"]["angents-address"]]} textStyle={{ marginLeft: 4 }}/>
                            <Row data={[" 商標地址", params.trademarkDetail["_source"]["angents-address"]]} textStyle={{ marginLeft: 4 }}/> */}

                             </TableWrapper>
                           
              

                        
                     
                    
                   
                        </Table>
                    

                    </View>
                </View>
            </Scroll>
        </Background>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e5e5e5"
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    GridViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        margin: 5,
        backgroundColor: '#7B1FA2'
    },
    GridViewTextLayout: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        color: '#fff',
        padding: 10,
    }
});
export default ResultDetail;