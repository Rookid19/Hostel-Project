import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, StyledButton, StyledButtonText } from '../../utils/styles'
import CustomTextInput from '../../components/CustomTextInput'

const Register = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.space}></Text>
      <CustomTextInput label="First name"/>
      <CustomTextInput label="Last name" />
      <CustomTextInput label="Student ID"/>
      <CustomTextInput label="Contact"/>
      <CustomTextInput label="Program"/>
      <CustomTextInput label="Level"/>
      <CustomTextInput label="Guardian Name"/>
      <CustomTextInput label="Guardian Contact"/>
      <StyledButton>
        <StyledButtonText>Register</StyledButtonText>
      </StyledButton>
    </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: Colors.white
  }
})