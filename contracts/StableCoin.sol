// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

/**
 * @dev USDC clone implemented using ERC20
 */
contract StableCoin is Ownable, ERC20 {
  constructor() ERC20('USD Coin', 'USDC') {}

  /**
   * @dev Returns the number of decimals used by USDC
   * @return uint8 decimals
   */
  function decimals() public pure override returns (uint8) {
    return 6;
  }

  /**
   * @dev Mints amount of tokens to account address
   * @param account recipient address
   * @param amount amount of tokens to mint
   */
  function mint(address account, uint amount) external onlyOwner {
    _mint(account, amount);
  }
}
