import { View, Text, SafeAreaView, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { COLORS, SIZES, icons } from "../../constants";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { ScrollView } from "react-native-gesture-handler";

const tabs = ["About", "Qualifications", "Responsibilities"];
import { jobs } from "../../dummy_data";
import { useFonts } from "expo-font";

const JobDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const isLoading = false;
  const error = false;
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [jobItem, setJobItem] = useState();

  const data = jobs.data;

  useEffect(() => {
    //alert(params.id, "params");
    const result = jobs.data.find((j) => j.job_id === params.id);
    console.log(result);
    setJobItem(result);
  }, [params]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const result = jobs.data.find((j) => j.job_id === params.id);
    setJobItem(result);
    setRefetch(false);
  }, []);
  // const [fontsLoaded] = useFonts({
  //   DMBold: require("../../assets/fonts/DMSans-Bold.ttf"),
  //   DMMedium: require("../../assets/fonts/DMSans-Medium.ttf"),
  //   DMRegular: require("../../assets/fonts/DMSans-Regular.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualification"
            points={jobItem?.job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "About":
        return (
          <JobAbout info={jobItem?.job_description ?? "No data provided"} />
        );
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={jobItem?.job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
    }
  };
  return (
    <SafeAreaView sttyle={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={jobItem?.employer_logo}
                jobTitle={jobItem?.job_title}
                companyName={jobItem?.employer_name}
                location={jobItem?.job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
            // <FlatList
            // data={jobs.data}
            // renderItem={({item}) => (
            //   <PopularJobCard item={item} selectedJob={selectedJob}
            //   handleCardPress={handleCardPress}/>
            // )}
            // keyExtractor={(item) => item.job_id}
            // contentContainerStyle={{columnGap: SIZES.medium}}
            // horizontal
            // />
          )}
        </ScrollView>
        <JobFooter
          url={
            jobItem?.job_google_link ??
            "https://careers.google.com/jobs/results/"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
