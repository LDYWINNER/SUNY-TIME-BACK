"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const Announcement = () => {
    return (<react_1.Accordion defaultIndex={[2, 3]} allowMultiple>
      <react_1.AccordionItem>
        <h2>
          <react_1.AccordionButton>
            <react_1.Box as="span" flex="1" textAlign="left" fontWeight={600}>
              공지사항 1
            </react_1.Box>
            <react_1.AccordionIcon />
          </react_1.AccordionButton>
        </h2>
        <react_1.AccordionPanel pb={4} fontSize={16} fontWeight={400}>
          안녕하세요 수니학생 여러분! 타 대학들과는 다르게 저희 학교는 자세한
          수강평을 볼 수 있는 사이트가 본교에서 지원하는 Classie Eval 말고는
          따로 없기 때문에 몇몇 학생들끼리 모여서 각 과목별 수강평을 확인할 수
          있는 사이트를 개발했습니다.
        </react_1.AccordionPanel>
      </react_1.AccordionItem>

      <react_1.AccordionItem>
        <h2>
          <react_1.AccordionButton>
            <react_1.Box as="span" flex="1" textAlign="left" fontWeight={600}>
              공지사항 2
            </react_1.Box>
            <react_1.AccordionIcon />
          </react_1.AccordionButton>
        </h2>
        <react_1.AccordionPanel pb={4} fontSize={16} fontWeight={400}>
          아직 수니타임이 많이 부족하지만 저희의 노력을 이쁘게 봐주세요 ㅎㅎ
          수강평 사이트를 통해, 학생 여러분께서 시간표를 조율하시는 데에
          조금이나마 도움을 드리고 싶습니다 :)
        </react_1.AccordionPanel>
      </react_1.AccordionItem>

      <react_1.AccordionItem>
        <h2>
          <react_1.AccordionButton>
            <react_1.Box as="span" flex="1" textAlign="left" fontWeight={600}>
              공지사항 3 - 이벤트 (2023.05.14)
            </react_1.Box>
            <react_1.AccordionIcon />
          </react_1.AccordionButton>
        </h2>
        <react_1.AccordionPanel pb={4} fontSize={16} fontWeight={400}>
          최근 수강신청 관련해서 선배님들에게 질문을 하거나 상담을 요청하시는
          후배님들이 많이 보입니다. 후배님들의 고민해결을 위해 특별 질의 응답
          이벤트를 진행하려합니다! 쑤니타임 내의 게시판(Bulletin page)에 각종
          질문들을 남겨주시면 각 과의 고학번들이 친절하고 빠르게 답변을 드립니다
          :)
        </react_1.AccordionPanel>
      </react_1.AccordionItem>

      <react_1.AccordionItem>
        <h2>
          <react_1.AccordionButton>
            <react_1.Box as="span" flex="1" textAlign="left" fontWeight={600}>
              공지사항 4 - 감사인사 (2023.05.14)
            </react_1.Box>
            <react_1.AccordionIcon />
          </react_1.AccordionButton>
        </h2>
        <react_1.AccordionPanel pb={4} fontSize={16} fontWeight={400}>
          과분한 관심 가져주셔서 감사합니다. 가입 유저는 100 명, 수강평은 300
          개가 넘었습니다. 책임감을 갖고 좀 더 도움이 되는 사이트가 될 수 있도록
          노력하겠습니다. 종종 저희 사이트가 도움이 되었다고 말씀해주시는 분들도
          계신데 저희에게는 작은 한 마디가 큰 힘이 됩니다. 앞으로도 응원과 관심
          부탁드립니다.
        </react_1.AccordionPanel>
      </react_1.AccordionItem>
    </react_1.Accordion>);
};
exports.default = Announcement;
