import { HomeView, Title, Item } from "./styles";
import { FlatList, View, Text, ItemName } from "react-native";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function Home({ navigation }) {
    const [products, setProducts] = useState()
    const [page, setPage] = useState()
    const [perpage, setPerPage] = useState()
    const [total, setTotal] = useState()

    useEffect(() => {

      console.log("entrou >");
      
        api.get("/?page=0&perPage=5&orderDirection=asc")
        .then((response) => {
          //console.log("response >", response);

          
          setProducts(response.data.products)
          setPage(response.data.page)
          setPerPage(response.data.perPage)
          setTotal(response.data.totalItems)
        })
        .catch((error) => {
          console.log("error", error.response);
          console.log("remove");
         // AsyncStorage.removeItem('login').then(() => {
            //navigation.navigate('Login')
         // })
        });
     
    }, [])


    const renderItem = ({ item }) => {
      
                    <Item>
                       
                                <Text>{item.name}</Text>
                         
                                <Text>{item.price}</Text>
                         
                        
                    </Item>
                
        
    }

    
  return (
    <HomeView>
          <Title>Home</Title>
          <FlatList
            data={products} 
            renderItem={({ item, index, separators }) => (
              <TouchableHighlight
                onPress={() => this._onPress(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View style={{ backgroundColor: 'white' }}>
                  <Text>{item.name}</Text>
                  <Text>{item.price}</Text>
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={item => item._id.toString()}
          />

    </HomeView>
  );
}
