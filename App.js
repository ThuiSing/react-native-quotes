import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [quotes, setQuotes] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => setQuotes(data))
      .finally(() => setLoader(false));
  }, [refresh]);

  const handleRefresh = () => {
    // console.log("gello");
    refresh ? setRefresh(false) : setRefresh(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="black" />
      <Text
        style={{
          position: "absolute",
          top: 10,
          fontSize: 25,
          color: "white",
          borderColor: "red",
          fontWeight: "bold",
        }}
      >
        Welcome to Quotes World
      </Text>
      {loader ? (
        <Image
          source={{
            width: 100,
            height: 80,
            uri: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif",
          }}
        />
      ) : (
        <>
          <View style={styles.quotesBox}>
            <Text style={{ fontSize: 20, letterSpacing: 1 }}>
              {quotes?.content}
            </Text>

            <View style={[[styles.miniBox, { rotation: 45 }]]} />
          </View>
          <Text style={styles.authorName}>{quotes?.authorSlug}</Text>
        </>
      )}
      <TouchableOpacity
        style={styles.refreshBtn}
        disabled={loader ? true : false}
        onPress={handleRefresh}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black", fontSize: 15 }}>Refresh More</Text>
          <Image
            style={{ marginLeft: 4 }}
            source={require("./assets/icon1.png")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBD11",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : "",
    alignItems: "center",
    justifyContent: "center",
  },
  quotesBox: {
    backgroundColor: "#F7F7F7",
    padding: 20,
    width: "80%",
    height: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    position: "relative",
  },
  miniBox: {
    backgroundColor: "#F7F7F7",
    width: 40,
    height: 40,
    position: "absolute",
    bottom: -20,
    left: "50%",
    right: "50%",
    borderRadius: 2,
  },
  authorName: {
    fontSize: 23,
    marginTop: 35,
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  refreshBtn: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 10,
    position: "absolute",
    bottom: 40,
  },
});
