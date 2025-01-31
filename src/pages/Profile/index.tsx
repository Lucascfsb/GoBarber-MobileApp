import React, { useRef, useCallback } from 'react';
import { KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';

import api from '../../services/api'

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Title,
  BackButton,
  UserAvatarButton,
  UserAvatar,
} from './styles'


interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}


const SignUp: React.FC = () => {
  const {user, updateUser} = useAuth ()

  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const emailInputRef = useRef<TextInput>(null)
  const oldPasswordInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  const handleSignUp = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        old_password: Yup.string(),
        password: Yup.string(),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      const {name, email, old_password, password, password_confirmation} = data

      const formData = {
        name,
        email,
        ...(old_password
        ? {
          old_password,
          password,
          password_confirmation ,
          }
        : {}),
      };

      const response = await api.put('/profile', formData)

      updateUser(response.data)

      Alert.alert(
        'Perfil atualizado com sucesso!',
      )

      navigation.goBack()
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return
      }

      Alert.alert(
       'Erro na atualização',
       'Occorreu um erro ao atualizar seu perfil, tente novamente.',
      );
    }
  }, [navigation, updateUser])

  const handleUpdateAvatar = useCallback(async () => {
    Alert.alert(
      'Escolha uma opção',
      'Você deseja tirar uma foto ou escolher uma da galeria?',
      [
        {
          text: 'Câmera',
          onPress: async () => {
            await handleUpdateAvatarSource('camera');
          },
        },
        {
          text: 'Galeria',
          onPress: async () => {
            await handleUpdateAvatarSource('gallery');
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  }, []);
  
  const handleUpdateAvatarSource = useCallback(async (source: 'camera' | 'gallery') => {
    try {
      if (source === 'camera') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão necessária', 'Precisamos da permissão para usar a câmera.');
          return;
        }
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar a galeria.');
          return;
        }
      }
  
      const result = source === 'camera'
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: 'livePhotos',
            quality: 1,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            quality: 1,
          });
  
      if (result.assets && result.assets.length > 0) {
        console.log('Imagem selecionada:', result.assets[0].uri);
        
        const data = new FormData();
        data.append('avatar', {
          type: 'image/jpg',
          name: `${user.id}.jpg`,
          uri: result.assets[0].uri,
        });
        

        api.patch('users/avatar', data).then(apiResponse => {
          updateUser(apiResponse.data)
        })
      }
    } catch (error) {
      console.error('Erro ao acessar câmera ou galeria:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar acessar a câmera ou galeria.');
    }
  }, [updateUser, user.id]);

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <>
      <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding': undefined }
      enabled
      >
        <ScrollView
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{ flex:1 }}
        >
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={26} color="#999591" />
            </BackButton>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
            <Title>Meu perfil</Title>
            </View>

            <Form initialData={user} ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize='words'
                name='name'
                icon='user'
                placeholder='Nome'
                returnKeyType='next'
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />

              <Input
                ref={emailInputRef}
                keyboardType='email-address'
                autoCorrect={false}
                autoCapitalize='none'
                name='email'
                icon='mail'
                placeholder='E-mail'
                returnKeyType='next'
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />

              <Input
                ref={oldPasswordInputRef}
                name='old_password'
                icon='lock'
                placeholder='Senha atual'
                secureTextEntry
                textContentType='newPassword'
                returnKeyType='next'
                containerStyle={{marginTop: 16}}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />

              <Input
                ref={passwordInputRef}
                name='password'
                icon='lock'
                placeholder='Nova senha'
                secureTextEntry
                textContentType='newPassword'
                returnKeyType='next'
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus()
                }}
              />

              <Input
                ref={confirmPasswordInputRef}
                name='password_confirmation'
                icon='lock'
                placeholder='Confirmar senha'
                secureTextEntry
                textContentType='newPassword'
                returnKeyType='send'
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default SignUp
