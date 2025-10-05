import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { MemberManagementButton } from "./MemberManagementButton";
import { MemberManagementDropdown } from "./MemberManagementDropdown";
import { MemberManagementHeader } from "./MemberManagementHeader";
import { AddMemberButton } from "./AddMemberButton";
import { MemberList, Member } from "./MemberList";
import { LeaderChangeView, MemberDeleteView } from "./MemberActionView";
import { LeaderChangeConfirmModal } from "./LeaderChangeConfirmModal";
import { MemberDeleteConfirmModal } from "./MemberDeleteConfirmModal";

const MOCK_MEMBERS: Member[] = Array.from({ length: 20 }, (_, index) => ({
  id: `member-${index}`,
  name: "홍길동",
  isLeader: index === 0,
}));

export default function MemberManagement() {
  const [isOpen, setIsOpen] = useState(false); // 팀원 관리 드롭다운 열림 여부
  const [isEditOpen, setIsEditOpen] = useState(false); // 팀원 관리 드롭다운 내부 편집 버튼 열림 여부

  // 팀원 관리 드롭다운 내부 뷰 타입
  // main: 팀원 관리 뷰, leaderChange: 대표자 변경 뷰, memberDelete: 팀원 삭제 뷰
  const [currentView, setCurrentView] = useState<"main" | "leaderChange" | "memberDelete">("main");
  const [currentLeaderId, setCurrentLeaderId] = useState("member-0");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedLeaderId, setSelectedLeaderId] = useState("member-0");
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [selectedDeleteMemberId, setSelectedDeleteMemberId] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const editDropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditOpen(!isEditOpen);
  };

  const handleAddMember = () => {
    // TODO: 팀원 추가 로직 구현 -> 팀원추가 뷰가 따로 없는것 같습니다..?
  };

  const handleMemberClick = () => {
    // TODO: 멤버 클릭했을때 따로 무슨 기능을 하는지 물어보기
  };

  // 팀원 관리 드롭다운 내부 편집 버튼 클릭 시 뷰 변경
  const handleEditAction = (action: string) => {
    setIsEditOpen(false);

    if (action === "대표자 변경") {
      setCurrentView("leaderChange");
    } else if (action === "팀원 삭제") {
      setCurrentView("memberDelete");
    }
  };

  // 대표자 변경 시 모달 열기
  const handleLeaderChange = (newLeaderId: string) => {
    setSelectedLeaderId(newLeaderId);
    setIsConfirmModalOpen(true);
  };

  // 대표자 변경 시 모달 확인 버튼 클릭 시 대표자 변경
  const handleConfirmLeaderChange = () => {
    setCurrentLeaderId(selectedLeaderId);
    setIsConfirmModalOpen(false);
    setCurrentView("main");
  };

  // 팀원 삭제 시 모달 열기
  const handleMemberDelete = (memberId: string) => {
    setSelectedDeleteMemberId(memberId);
    setIsDeleteConfirmModalOpen(true);
  };

  // 팀원 삭제 시 모달 확인 버튼 클릭 시 팀원 삭제
  const handleConfirmMemberDelete = () => {
    // TODO: 삭제 로직 구현
    console.log("팀원 삭제:", selectedDeleteMemberId);
    setIsDeleteConfirmModalOpen(false);
    setCurrentView("main");
  };

  // 팀원 관리 드롭다운 외부 클릭 시 뷰 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsEditOpen(false);
        setCurrentView("main");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      css={css`
        position: relative;
        display: inline-block;
      `}
    >
      <MemberManagementButton onClick={handleClick} memberCount={MOCK_MEMBERS.length} />

      {isOpen && (
        <MemberManagementDropdown>
          {currentView === "main" ? (
            <>
              <div
                css={css`
                  padding: 1.6rem 1.6rem 0 1.6rem;
                `}
              >
                <MemberManagementHeader
                  isEditOpen={isEditOpen}
                  onEditClick={handleEditClick}
                  editDropdownRef={editDropdownRef}
                  onEditAction={handleEditAction}
                />
              </div>
              <div
                css={css`
                  flex: 1;
                  overflow-y: auto;
                  padding: 0 1.6rem 1.6rem 1.6rem;
                `}
              >
                <AddMemberButton onClick={handleAddMember} />
                <MemberList members={MOCK_MEMBERS} onMemberClick={handleMemberClick} />
              </div>
            </>
          ) : currentView === "leaderChange" ? (
            <div
              css={css`
                padding: 1.6rem;
                overflow-y: auto;
              `}
            >
              <LeaderChangeView
                members={MOCK_MEMBERS}
                currentLeaderId={currentLeaderId}
                onBack={() => setCurrentView("main")}
                onConfirm={handleLeaderChange}
              />
            </div>
          ) : (
            <div
              css={css`
                padding: 1.6rem;
                overflow-y: auto;
              `}
            >
              <MemberDeleteView
                members={MOCK_MEMBERS}
                currentLeaderId={currentLeaderId}
                onBack={() => setCurrentView("main")}
                onDelete={handleMemberDelete}
              />
            </div>
          )}
        </MemberManagementDropdown>
      )}

      {isConfirmModalOpen && <LeaderChangeConfirmModal onConfirm={handleConfirmLeaderChange} onCancel={() => setIsConfirmModalOpen(false)} />}
      {isDeleteConfirmModalOpen && (
        <MemberDeleteConfirmModal onConfirm={handleConfirmMemberDelete} onCancel={() => setIsDeleteConfirmModalOpen(false)} />
      )}
    </div>
  );
}
