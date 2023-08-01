import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import styles from './nearbyjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from '../../../hook/useFetch';
import { jobs } from '../../../dummy_data';
import { useRouter } from 'expo-router';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';

const Nearbyjobs = () => {
  const router = useRouter()
  const isLoading = false
  const error= false

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  // console.log(jobs)



  // const {data, isLoading, error} = useFetch('search', {query: 'React developer', num_pages: 1})
  // const { data, isLoading, error } = useFetch();
  // const { data, isLoading, error } = useFetch();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {
          isLoading? (
            <ActivityIndicator size='large' color={COLORS.primary}/>
          ): error? (
            <Text>Something went wrong</Text>
          ):(
            jobs.data?.map((job) => (
              <NearbyJobCard
                key={job.job_id}
                job={job}
                handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              />
            ))
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
          
          )
        }
      
      </View>
    </View>
  )
}


export default Nearbyjobs