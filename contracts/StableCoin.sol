// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract StableCoin is Ownable, ERC20 {
  constructor() ERC20('USD Coin', 'USDC') {}

  function mint(address account, uint amount) external onlyOwner {
    _mint(account, amount);
  }

  fallback() external {}
}
