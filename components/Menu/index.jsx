import { HomeView, Title, RenderItem } from "./styles";
import { FlatList, } from "react-native";
import { useEffect, useState } from "react";
import api from "../../services/api";

export function Menu({ props, user }) {
    
    
  return (
    <HomeView>
          <Title>{user.name}</Title>
    </HomeView>
  );
}
