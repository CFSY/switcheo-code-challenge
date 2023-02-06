// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// partial ERC20 interface for interacting with contract
interface IERC20 {
    function balanceOf(address) external view returns (uint256);
}

contract GetTokenBalances {

    // struct to store both token address and balance
    struct TokenBalance {
        address token;
        uint256 balance;
    }

    // returns an array of TokenBalances for given the wallet address and token addresses
    function getBalances(address wallet, address[] memory tokens) public view returns (TokenBalance[] memory) {
        TokenBalance[] memory tokenBalances = new TokenBalance[](tokens.length);
        for (uint256 i = 0; i < tokens.length; i++) {
            tokenBalances[i] = TokenBalance(tokens[i], IERC20(tokens[i]).balanceOf(wallet));
        }
        return tokenBalances;
    }
}