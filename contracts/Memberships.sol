// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Memberships is Ownable {
  struct Membership {
    // address creator;
    bytes32 name;
    string title;
    string description;
    string avatarUrl;
    string bannerUrl;
    uint256 interests;
  }
  mapping(address => Membership) memberships;
  mapping(bytes32 => address) membershipCreatorsByName;

  error NotCreatorError();

  modifier onlyCreator(bytes32 name) {
    if (membershipCreatorsByName[name] != msg.sender) {
      revert NotCreatorError();
    }
    _;
  }

  /* function getMembership(address creator) external view returns(Membership memory) {
    return memberships[creator];
  } */

  function getMembershipByName(bytes32 name) external view returns (Membership memory) {
    address creator = membershipCreatorsByName[name];
    return memberships[creator];
  }

  function createMembership(Membership memory membership) external {
    memberships[msg.sender] = membership;
    membershipCreatorsByName[membership.name] = msg.sender;
  }

  function updateMembership(Membership memory membership) onlyCreator(membership.name) external {
    memberships[msg.sender] = membership;
  }
}
