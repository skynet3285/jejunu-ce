import { executeQuery } from './server_connect';

// 입력값에서 특정 특수문자를 제거합니다.
export function sanitizeInput(input: string): string {
  return input.replace(/['"\\`#;]/g, '');
}

export interface User {
  user_id: string;
  user_pw: string;
  user_access: number;
  user_name: string;
  user_phone_number: string;
  user_email: string;
}

export interface UserLogin {
  user_id: string;
  user_pw: string;
}

export async function loginUser(userLogin: UserLogin): Promise<User | null> {
  const query = `
    SELECT *
    FROM user
    WHERE user_id = '${userLogin.user_id}' AND user_pw = '${userLogin.user_pw}'
  `;

  const response = await executeQuery(query);
  const data = response.data as User[];
  if (data.length > 0) {
    return data[0];
  }
  return null;
}

export async function registerUser(user: User): Promise<void> {
  const query = `
      INSERT INTO user (
        user_id,
        user_pw,
        user_access,
        user_name,
        user_phone_number,
        user_email
      ) VALUES ('${user.user_id}', '${user.user_pw}', '${user.user_access}', '${user.user_name}', '${user.user_phone_number}', '${user.user_email}')
    `;

  await executeQuery(query);
}

export interface Agenda {
  agenda_no: number;
  pension_id: number;
  agenda_title: string;
  agenda_contents: string;
  voting_type: string;
  deadline_date: string;
}

export async function loadAgendasByPensionId(
  pensionId: string,
): Promise<Agenda[] | null> {
  const query = `
        SELECT *
        FROM agenda
        WHERE pension_id = '${pensionId}'
      `;

  const response = await executeQuery(query);
  const data = response.data as Agenda[];
  if (data.length > 0) {
    return data;
  }
  return null;
}

export async function loadAgendaByAgendaNo(
  agendaNo: string,
): Promise<Agenda | null> {
  const query = `
          SELECT *
          FROM agenda
          WHERE agenda_no = '${agendaNo}'
        `;

  const response = await executeQuery(query);
  const data = response.data as Agenda[];
  if (data.length > 0) {
    return data[0];
  }
  return null;
}

export async function registerAgenda(agenda: Agenda): Promise<void> {
  const query = `
  INSERT INTO agenda(
    pension_id,
    agenda_title,
    agenda_contents,
    voting_type,
    deadline_date
  ) VALUES (
    ${agenda.pension_id},
    '${agenda.agenda_title}',
    '${agenda.agenda_contents}',
    '${agenda.voting_type}',
    '${agenda.deadline_date}'
  )
  `;

  await executeQuery(query);
}

export interface AgendaVote {
  agenda_no: number;
  user_id: string;
  participate_vote: boolean;
  vote: string;
}

export async function loadVoteByAgendaNoAndUserId(
  agendaNo: string,
  userId: string,
): Promise<AgendaVote | null> {
  const query = `
        SELECT vote
        FROM agenda_vote
        WHERE agenda_no = '${agendaNo}' AND user_id = '${userId}'
    `;

  const response = await executeQuery(query);
  const data = response.data as AgendaVote[];
  if (data.length > 0) {
    return data[0];
  }
  return null;
}

export async function registerVote(agendaVote: AgendaVote): Promise<void> {
  const query = `
    INSERT INTO agenda_vote (
        agenda_no,
        user_id,
        participate_vote,
        vote
    )
        VALUES ('${agendaVote.agenda_no}', '${agendaVote.user_id}', ${agendaVote.participate_vote}, '${agendaVote.vote}')
    `;

  await executeQuery(query);
}

export interface Pension {
  article_id: number;
  pension_id: number;
  article_title: string;
  article_contents: string;
  pension_img: string;
  article_active: boolean;
  current_investment_amount: number;
  total_investment_amount: number;
  minimum_investment_amount: number;
  number_of_participants: number;
  maximum_of_participants: number;
  deadline_date: string;
}

export async function loadPensionByPensionId(
  pensionId: number,
): Promise<Pension | null> {
  const query = `
      SELECT *
      FROM share_pension
      WHERE pension_id = ${pensionId}
    `;

  const response = await executeQuery(query);
  const data = response.data as Pension[];
  if (data.length > 0) {
    return data[0];
  }
  return null;
}

export async function loadPensions(): Promise<Pension[] | null> {
  const query = `
    SELECT *
    FROM share_pension
  `;

  const response = await executeQuery(query);
  const data = response.data as Pension[];
  if (data.length > 0) {
    return data;
  }
  return null;
}

export async function registerArticle(data: Pension): Promise<void> {
  const query = `
  INSERT INTO share_pension (
    pension_id,
    article_title,
    article_contents,
    pension_img,
    article_active,
    current_investment_amount,
    total_investment_amount,
    minimum_investment_amount,
    number_of_participants,
    maximum_of_participants,
    deadline_date
  ) VALUES (
    ${data.pension_id},
    '${data.article_title}',
    '${data.article_contents}',
    '${data.pension_img}',
    ${data.article_active},
    ${data.current_investment_amount},
    ${data.total_investment_amount * 10000},
    ${data.minimum_investment_amount * 10000},
    ${data.number_of_participants},
    ${data.maximum_of_participants},
    '${data.deadline_date}'
  )
    `;

  await executeQuery(query);
}

export interface OwnPension {
  user_id: string;
  pension_id: number;
  own_percent: number;
  investment_amount: number;
}

export async function loadOwnPensionsByUserId(
  userId: string,
): Promise<OwnPension[] | null> {
  const query = `
      SELECT *
      FROM own
      WHERE user_id = '${userId}'
    `;

  const response = await executeQuery(query);
  const data = response.data as OwnPension[];
  if (data.length > 0) {
    return data;
  }
  return null;
}

export async function loadOwnPensionByUserIdAndPensionId(
  userId: string,
  pensionId: string,
): Promise<OwnPension | null> {
  const query = `
    SELECT *
    FROM own
    WHERE user_id = '${userId}' AND pension_id = ${pensionId}
  `;

  const response = await executeQuery(query);
  const data = response.data as OwnPension[];
  if (data.length > 0) {
    return data[0];
  }
  return null;
}

export interface Chat {
  chat_no: number;
  chat_id: number;
  user_id: string;
  chat_contents: string;
  chat_date: string;
}

export async function sendChat(chat: Chat): Promise<void> {
  const query = `
    INSERT INTO chat (
        chat_id,
        user_id,
        chat_contents,
        chat_date
    ) VALUES (${chat.chat_id}, '${chat.user_id}', '${chat.chat_contents}', '${chat.chat_date}')
    `;

  await executeQuery(query);
}

export async function loadChatsByChatId(
  chatId: string,
): Promise<Chat[] | null> {
  const query = `
          SELECT *
          FROM chat
          WHERE chat_id = ${chatId};
      `;

  const response = await executeQuery(query);
  const data = response.data as Chat[];
  if (data.length > 0) {
    return data;
  }
  return null;
}

export interface ChatParticipant {
  chat_id: number;
  user_id: string;
  participant_date: string;
}

export async function loadChatParticipantsByUserId(
  userId: string,
): Promise<ChatParticipant[] | null> {
  const query = `
        SELECT *
        FROM chat_participants
        WHERE user_id = '${userId}'
    `;

  const response = await executeQuery(query);
  const data = response.data as ChatParticipant[];
  if (data.length > 0) {
    return data;
  }
  return null;
}

export interface ChatRoom {
  chat_id: number;
  chat_title: string;
  chat_number_ofparticipants: number;
}

export async function loadChatRoomByChatId(
  chatId: string,
): Promise<ChatRoom | null> {
  const query = `
          SELECT *
          FROM chat_room
          WHERE chat_id = '${chatId}'
        `;

  const response = await executeQuery(query);
  const data = response.data as ChatRoom[];
  if (data.length > 0) {
    return data[0];
  }
  return null;
}

export async function loadRecentChatByChatId(
  chatId: string,
): Promise<Chat | null> {
  const query = `
        SELECT c.*
        FROM chat c
        JOIN (
            SELECT chat_id, MAX(chat_no) AS max_chat_no
            FROM chat
            GROUP BY chat_id
        ) AS subquery ON c.chat_id = subquery.chat_id AND c.chat_no = subquery.max_chat_no
        WHERE c.chat_id = ${chatId};
    `;

  const response = await executeQuery(query);
  const data = response.data as Chat[];
  if (data.length > 0) {
    return data[0];
  }
  return null;
}
