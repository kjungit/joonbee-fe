'use client';

import RandomInterview from './RandomInterview';
import ChocieInterview from './ChoiceInterview';
import { useRecoilValue } from 'recoil';
import { interviewTypeAtom } from '../../../../recoil/interviewType/atom';
import useBeforeUnload from '../../../../hooks/useBeforeUnload';
import PreventBackModal from '../../../common/PreventBackModal';
import PreventTabletModal from '../../../common/PreventTabletModal';

export default function InterviewScreen() {
  const type = useRecoilValue(interviewTypeAtom);

  useBeforeUnload();

  return (
    <>
      {type === 'random' && <RandomInterview />}
      {type === 'choice' && <ChocieInterview />}
      <PreventBackModal />
      <PreventTabletModal />
    </>
  );
}
