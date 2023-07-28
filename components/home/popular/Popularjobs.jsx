import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

const Popularjobs = () => {
  const isLoading = false
  const error= false
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
      {/* {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )} */}
        {
          isLoading? (
            <ActivityIndicator size='large' color={COLORS.primary}/>
          ): error? (
            <Text>Something went wrong</Text>
          ):(
            <FlatList
            data={[1,2,3,4]}
            renderItem={({item}) => (
              <PopularJobCard item={item}/>
            )}
            keyExtractor={item => item}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal
            />
          
          )
        }
      
      </View>
    </View>
  )
}


export default Popularjobs