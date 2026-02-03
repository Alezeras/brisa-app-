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

export default function TermsOfUseScreen() {
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
            <Text style={styles.headerTitle}>Termos de Uso</Text>
            <View style={{width: 70}} /> 
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, darkMode && styles.cardDark]}>
          
          <Text style={[styles.mainTitle, darkMode && styles.textTitleDark]}>TERMOS DE USO – CLOCK</Text>
          
          <Paragraph>
            Estes Termos de Uso regulam o acesso e a utilização do aplicativo Clock. Ao criar uma conta, acessar ou utilizar o Aplicativo, o usuário declara que leu, compreendeu e concorda integralmente com estes Termos.
          </Paragraph>

          <View style={styles.divider} />

          <SectionTitle>1. Aceitação dos Termos</SectionTitle>
          <Paragraph>
            O uso do Clock implica na aceitação plena e sem reservas destes Termos de Uso. Caso o usuário não concorde com qualquer disposição aqui prevista, deverá interromper o uso do Aplicativo.
          </Paragraph>

          <SectionTitle>2. Descrição do Serviço</SectionTitle>
          <Paragraph>
            O Clock é um aplicativo de gestão de tempo, atividades e projetos, destinado a profissionais como professores, consultores, mentores, freelancers, advogados, engenheiros, empresas e outros.
          </Paragraph>
          <Paragraph>O Aplicativo permite, entre outras funcionalidades:</Paragraph>
          <BulletPoint>Registro e controle de tempo por atividade ou projeto</BulletPoint>
          <BulletPoint>Organização de atividades, compromissos e calendário</BulletPoint>
          <BulletPoint>Armazenamento de histórico de uso</BulletPoint>
          <BulletPoint>Geração de relatórios de produtividade</BulletPoint>
          <Paragraph>
            O serviço pode ser atualizado, modificado ou descontinuado, total ou parcialmente, a critério do desenvolvedor.
          </Paragraph>

          <SectionTitle>3. Cadastro e Conta do Usuário</SectionTitle>
          <Paragraph>
            Para acessar determinadas funcionalidades, é necessário criar uma conta, fornecendo informações verdadeiras, completas e atualizadas.
          </Paragraph>
          <Paragraph>O usuário é responsável por:</Paragraph>
          <BulletPoint>Manter a confidencialidade de suas credenciais de acesso</BulletPoint>
          <BulletPoint>Todas as atividades realizadas por meio de sua conta</BulletPoint>
          <Paragraph>
            O Clock não se responsabiliza por acessos não autorizados decorrentes de negligência do usuário.
          </Paragraph>

          <SectionTitle>4. Uso Permitido</SectionTitle>
          <Paragraph>O usuário compromete-se a utilizar o Aplicativo apenas para fins lícitos, incluindo:</Paragraph>
          <BulletPoint>Controle de tempo e produtividade</BulletPoint>
          <BulletPoint>Organização de projetos e compromissos profissionais ou pessoais</BulletPoint>
          <BulletPoint>Uso individual ou corporativo, conforme aplicável</BulletPoint>

          <SectionTitle>5. Restrições de Uso</SectionTitle>
          <Paragraph>É expressamente proibido ao usuário:</Paragraph>
          <BulletPoint>Utilizar o Aplicativo para fins ilegais ou não autorizados</BulletPoint>
          <BulletPoint>Violar, tentar violar ou comprometer a segurança do sistema</BulletPoint>
          <BulletPoint>Compartilhar credenciais de acesso com terceiros</BulletPoint>
          <BulletPoint>Copiar, modificar, distribuir, vender ou explorar o Aplicativo sem autorização</BulletPoint>
          <BulletPoint>Praticar atos que possam prejudicar o funcionamento do serviço ou outros usuários</BulletPoint>
          <Paragraph>
            O descumprimento destas regras poderá resultar na suspensão ou encerramento da conta, sem prejuízo de outras medidas cabíveis.
          </Paragraph>

          <SectionTitle>6. Proteção de Dados Pessoais (LGPD)</SectionTitle>
          <Paragraph>
            O tratamento dos dados pessoais dos usuários é realizado em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD).
          </Paragraph>
          <Paragraph>O Clock:</Paragraph>
          <BulletPoint>Coleta apenas os dados necessários para o funcionamento do Aplicativo</BulletPoint>
          <BulletPoint>Utiliza os dados para fins legítimos, específicos e informados</BulletPoint>
          <BulletPoint>Adota medidas técnicas e administrativas para proteger os dados contra acessos não autorizados</BulletPoint>
          
          <Paragraph>Os dados pessoais poderão ser utilizados para:</Paragraph>
          <BulletPoint>Funcionamento das funcionalidades do Aplicativo</BulletPoint>
          <BulletPoint>Geração de relatórios e histórico de uso</BulletPoint>
          <BulletPoint>Cumprimento de obrigações legais</BulletPoint>
          <Paragraph>
            O usuário poderá exercer seus direitos previstos na LGPD, incluindo acesso, correção e exclusão de dados, conforme descrito na Política de Privacidade.
          </Paragraph>

          <SectionTitle>7. Compartilhamento de Dados</SectionTitle>
          <Paragraph>O Clock não compartilha dados pessoais com terceiros, exceto:</Paragraph>
          <BulletPoint>Quando necessário para o funcionamento do serviço</BulletPoint>
          <BulletPoint>Mediante consentimento do usuário</BulletPoint>
          <BulletPoint>Para cumprimento de obrigação legal ou ordem judicial</BulletPoint>

          <SectionTitle>8. Disponibilidade do Serviço</SectionTitle>
          <Paragraph>O Aplicativo pode sofrer interrupções temporárias devido a:</Paragraph>
          <BulletPoint>Manutenção técnica</BulletPoint>
          <BulletPoint>Atualizações</BulletPoint>
          <BulletPoint>Falhas externas (internet, dispositivos, serviços de terceiros)</BulletPoint>
          <Paragraph>Não é garantido que o serviço estará disponível de forma contínua ou isenta de falhas.</Paragraph>

          <SectionTitle>9. Limitação de Responsabilidade</SectionTitle>
          <Paragraph>O Clock é disponibilizado, sem garantias expressas ou implícitas.</Paragraph>
          <Paragraph>O desenvolvedor não se responsabiliza por:</Paragraph>
          <BulletPoint>Perdas de dados decorrentes de mau uso</BulletPoint>
          <BulletPoint>Danos indiretos ou lucros cessantes</BulletPoint>
          <BulletPoint>Decisões tomadas com base nas informações fornecidas pelo Aplicativo</BulletPoint>
          <BulletPoint>Falhas causadas por terceiros ou fatores externos</BulletPoint>

          <SectionTitle>10. Encerramento e Suspensão da Conta</SectionTitle>
          <Paragraph>O usuário pode encerrar sua conta a qualquer momento.</Paragraph>
          <Paragraph>O Clock reserva-se o direito de suspender ou encerrar contas que violem estes Termos ou a legislação vigente.</Paragraph>

          <SectionTitle>11. Alterações dos Termos</SectionTitle>
          <Paragraph>Estes Termos de Uso poderão ser alterados a qualquer momento.</Paragraph>
          <Paragraph>As alterações entrarão em vigor a partir da publicação no Aplicativo.</Paragraph>
          <Paragraph>O uso contínuo do serviço após as alterações implica a aceitação dos novos Termos.</Paragraph>

          <SectionTitle>12. Contato</SectionTitle>
          <Paragraph>
            Para dúvidas, solicitações ou exercício de direitos relacionados a estes Termos ou à proteção de dados pessoais, o usuário pode entrar em contato pelo <Text style={{fontWeight: 'bold', color: '#193CB8'}}>xxxxxx</Text> canal de suporte disponível no Aplicativo.
          </Paragraph>

          <View style={styles.divider} />
          
          <Paragraph>
            Ao utilizar o Clock, o usuário declara concordar integralmente com estes Termos de Uso.
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
  paragraph: { color: '#4A5565', lineHeight: 22, marginBottom: 10, textAlign: 'justify' },
  textTitleDark: { color: '#81A1F8' }, 
  textDark: { color: '#E0E0E0' },

  bulletContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 5, paddingLeft: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4A5565', marginTop: 8, marginRight: 10 },
  bulletText: { flex: 1, color: '#4A5565', lineHeight: 22 },

  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 20 },
});