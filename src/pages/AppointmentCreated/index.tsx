import React, { useCallback, useMemo } from "react";
import Icon from "react-native-vector-icons/Feather";
import {format} from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR' 

import { Container, Title, Description, OkButton, OkButtonText } from "./styled";
import { useNavigation, useRoute } from "@react-navigation/core";

interface RouteParams {
  date: number
}

const AppointmentCreated: React.FC = () => {
  const {reset} = useNavigation()
  const {params} = useRoute()

  const routeParams = params as RouteParams

  const formattedDate = useMemo(() => {
    return format(
        routeParams.date, 
        "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", 
        {locale: ptBr}
      )
  }, [routeParams.date])

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [
        {
          name: 'Dashboard'
        }
      ],
      index: 0
    })
  }, [reset])

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>
        Agendamento concluído
      </Title>

      <Description>
        {formattedDate}
      </Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>
          OK
        </OkButtonText>
      </OkButton>
    </Container>
  )  
}

export default AppointmentCreated
