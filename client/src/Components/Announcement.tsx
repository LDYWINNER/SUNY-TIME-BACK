import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const Announcement = () => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontWeight={600}>
              공지사항 1
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} fontSize={16} fontWeight={400}>
          안녕하세요 수니학생 여러분! 타 대학들과는 다르게 저희 학교는 자세한
          수강평을 볼 수 있는 사이트가 본교에서 지원하는 Classie Eval 말고는
          따로 없기 때문에 몇몇 학생들끼리 모여서 각 과목별 수강평을 확인할 수
          있는 사이트를 개발했습니다.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontWeight={600}>
              공지사항 2
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} fontSize={16} fontWeight={400}>
          아직 수니타임이 많이 부족하지만 저희의 노력을 이쁘게 봐주세요 ㅎㅎ
          수강평 사이트를 통해, 학생 여러분께서 시간표를 조율하시는 데에
          조금이나마 도움을 드리고 싶습니다 :)
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
export default Announcement;
