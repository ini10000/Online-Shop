import React from "react";
import { FlatList, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";

const ProductOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  const selectHandler = (id, title) => {
    props.navigation.navigate("productDetail", {
      productId: id,
      productTitle: title
    });
  };
  return (
    <FlatList
      style={{ backgroundColor: "white" }}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageURL}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => selectHandler(itemData.item.id, itemData.item.title)}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => selectHandler(itemData.item.id, itemData.item.title)}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => navData.navigation.navigate("cart")}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  };
};

export default ProductOverviewScreen;
