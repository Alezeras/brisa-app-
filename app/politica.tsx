import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useAppStore } from '../store/useAppStore';

export default function PrivacyPolicyScreen() {
  const { darkMode, fontSize } = useAppStore();

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <Text style={[styles.sectionTitle, darkMode && styles.textTitleDark, { fontSize: fontSize + 2 }]}>
      {children}
    </Text>
  );

  const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <Text style={[styles.paragraph, darkMode && styles.textDark, { fontSize: fontSize }]}>
      {children}
    </Text>
  );

  const BulletPoint = ({ children }: { children: React.ReactNode }) => (
    <View style={styles.bulletContainer}>
      <View style={[styles.bullet, darkMode && { backgroundColor: '#FFF' }]} />
      <Text style={[styles.bulletText, darkMode && styles.textDark, { fontSize: fontSize }]}>
        {children}
      </Text>
    </View>
  );

  return (
    <View style={[styles.mainContainer, darkMode && styles.containerDark]}>
      
      <View style={[styles.header, darkMode && styles.headerDark]}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
               <Ionicons name="arrow-back" size={24} color="#FFF" />
               <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Política de Privacidade</Text>
            <View style={{width: 70}} /> 
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, darkMode && styles.cardDark]}>
          
          <Text style={[styles.mainTitle, darkMode && styles.textTitleDark]}>POLÍTICA DE PRIVACIDADE</Text>
          
          <Paragraph>
            O Clock respeita a sua privacidade e está comprometido com a proteção dos dados pessoais de seus usuários. Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos suas informações, em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
          </Paragraph>

          <View style={styles.divider} />

          <SectionTitle>1. Dados Pessoais Coletados</SectionTitle>
          <Paragraph>O Clock Brisa poderá coletar os seguintes dados pessoais:</Paragraph>
          
          <Text style={[styles.subTitle, darkMode && styles.textTitleDark, { fontSize: fontSize }]}>1.1 Dados fornecidos pelo usuário</Text>
          <BulletPoint>Nome</BulletPoint>
          <BulletPoint>Endereço de e-mail</BulletPoint>
          <BulletPoint>Informações de cadastro e perfil</BulletPoint>
          <BulletPoint>Dados relacionados a projetos, atividades, atendimentos e compromissos registrados no aplicativo</BulletPoint>

          <Text style={[styles.subTitle, darkMode && styles.textTitleDark, { fontSize: fontSize, marginTop: 10 }]}>1.2 Dados coletados automaticamente</Text>
          <BulletPoint>Informações técnicas do dispositivo (sistema operacional, versão do app)</BulletPoint>
          <BulletPoint>Dados de uso do aplicativo (interações, funcionalidades acessadas, data e hora de uso)</BulletPoint>
          
          <Paragraph>
            O Clock não coleta dados sensíveis, como informações de saúde, biometria, origem racial, religião ou dados financeiros, salvo quando estritamente necessário e com consentimento específico.
          </Paragraph>

          <SectionTitle>2. Finalidade do Tratamento dos Dados</SectionTitle>
          <Paragraph>Os dados pessoais são tratados exclusivamente para as seguintes finalidades:</Paragraph>
          <BulletPoint>Permitir o funcionamento adequado do aplicativo</BulletPoint>
          <BulletPoint>Identificar e autenticar usuários</BulletPoint>
          <BulletPoint>Registrar atividades, atendimentos e tempo de uso</BulletPoint>
          <BulletPoint>Gerar relatórios de produtividade</BulletPoint>
          <BulletPoint>Melhorar a experiência do usuário</BulletPoint>
          <BulletPoint>Garantir a segurança do sistema</BulletPoint>
          <BulletPoint>Cumprir obrigações legais e regulatórias</BulletPoint>

          <SectionTitle>3. Compartilhamento de Dados</SectionTitle>
          <Paragraph>O Clock não vende, aluga ou compartilha dados pessoais com terceiros, exceto:</Paragraph>
          <BulletPoint>Quando necessário para o funcionamento do serviço (ex.: serviços de hospedagem em nuvem)</BulletPoint>
          <BulletPoint>Para cumprimento de obrigações legais ou ordens judiciais</BulletPoint>
          <BulletPoint>Mediante consentimento expresso do usuário</BulletPoint>
          <Paragraph>Todos os parceiros e prestadores de serviço seguem padrões adequados de segurança e proteção de dados.</Paragraph>

          <SectionTitle>4. Armazenamento e Segurança dos Dados</SectionTitle>
          <Paragraph>Os dados são armazenados em ambientes seguros, com medidas técnicas e organizacionais adequadas para proteger contra:</Paragraph>
          <BulletPoint>Acesso não autorizado</BulletPoint>
          <BulletPoint>Perda, alteração ou divulgação indevida</BulletPoint>
          <BulletPoint>Vazamentos de dados</BulletPoint>
          <Paragraph>Apesar dos esforços, nenhum sistema é completamente seguro. O usuário reconhece e aceita esse risco.</Paragraph>

          <SectionTitle>5. Retenção e Exclusão de Dados</SectionTitle>
          <Paragraph>Os dados pessoais serão mantidos apenas pelo tempo necessário para cumprir as finalidades descritas nesta Política ou conforme exigido por lei.</Paragraph>
          <Paragraph>O usuário pode solicitar a exclusão de sua conta e de seus dados, respeitadas as obrigações legais de retenção.</Paragraph>

          <SectionTitle>6. Uso por Menores de Idade</SectionTitle>
          <Paragraph>O Clock não é destinado a menores de 18 anos.</Paragraph>
          <Paragraph>Caso seja identificado o tratamento indevido de dados de menores, as informações serão excluídas imediatamente.</Paragraph>

          <SectionTitle>7. Alterações desta Política</SectionTitle>
          <Paragraph>Esta Política de Privacidade pode ser atualizada a qualquer momento.</Paragraph>
          <Paragraph>Alterações relevantes serão comunicadas aos usuários por meio do aplicativo.</Paragraph>
          <Paragraph>O uso contínuo do aplicativo após a atualização indica concordância com a nova versão.</Paragraph>

          <SectionTitle>8. Conformidade</SectionTitle>
          <Paragraph>Esta Política atende aos requisitos de:</Paragraph>
          <BulletPoint>Transparência no tratamento de dados</BulletPoint>
          <BulletPoint>Finalidade clara e legítima</BulletPoint>
          <BulletPoint>Minimização da coleta de dados</BulletPoint>
          <BulletPoint>Segurança e controle pelo usuário</BulletPoint>

          <SectionTitle>9. Contato</SectionTitle>
          <Paragraph>
            Para dúvidas, solicitações ou exercício de direitos relacionados à privacidade e proteção de dados, entre em contato pelo canal de suporte <Text style={{fontWeight: 'bold', color: '#193CB8'}}>xxxxx</Text> disponível no aplicativo Clock.
          </Paragraph>

          <View style={styles.divider} />
          
          <Paragraph>
            Ao utilizar o Clock, o usuário declara estar ciente e de acordo com esta Política de Privacidade.
          </Paragraph>

        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F3F4F6' },
  containerDark: { backgroundColor: '#121212' },

  header: { backgroundColor: '#1C398E', paddingBottom: 15, paddingTop: Platform.OS === 'android' ? 35 : 10, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
  headerDark: { backgroundColor: '#152C70' },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, height: 50 },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backText: { color: 'rgba(255, 255, 255, 0.9)', marginLeft: 5, fontSize: 16 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },

  scrollContent: { padding: 20 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  cardDark: { backgroundColor: '#1E1E1E' },

  mainTitle: { fontSize: 22, fontWeight: 'bold', color: '#1C398E', marginBottom: 15, textAlign: 'center' },
  sectionTitle: { fontWeight: '700', color: '#1C398E', marginTop: 20, marginBottom: 8 },
  subTitle: { fontWeight: '600', color: '#2C499E', marginTop: 5, marginBottom: 5 },
  paragraph: { color: '#4A5565', lineHeight: 22, marginBottom: 10, textAlign: 'justify' },
  textTitleDark: { color: '#81A1F8' }, 
  textDark: { color: '#E0E0E0' },

  bulletContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 5, paddingLeft: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4A5565', marginTop: 8, marginRight: 10 },
  bulletText: { flex: 1, color: '#4A5565', lineHeight: 22 },

  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 20 },
});