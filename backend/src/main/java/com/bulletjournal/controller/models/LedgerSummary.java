package com.bulletjournal.controller.models;

import java.util.List;

public class LedgerSummary {

    private Double balance;

    private Double income;

    private Double expense;

    private List<Transaction> transactions;

    private List<TransactionsSummary> transactionsSummaries;

    public LedgerSummary() {
    }

    public LedgerSummary(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public Double getIncome() {
        return income;
    }

    public void setIncome(Double income) {
        this.income = income;
    }

    public Double getExpense() {
        return expense;
    }

    public void setExpense(Double expense) {
        this.expense = expense;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    public List<TransactionsSummary> getTransactionsSummaries() {
        return transactionsSummaries;
    }

    public void setTransactionsSummaries(List<TransactionsSummary> transactionsSummaries) {
        this.transactionsSummaries = transactionsSummaries;
    }
}
