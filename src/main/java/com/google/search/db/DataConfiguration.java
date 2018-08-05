package com.google.search.db;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.google.search.db")
@EntityScan(basePackages = { "com.google.search.model"})
@PropertySource("classpath:application.properties")
public class DataConfiguration {

  @Value("${spring.datasource.url}")
  String dataSourceURL;

  @Value("${spring.datasource.username}")
  String username;

  @Value("${spring.datasource.password}")
  String password;

  @Bean
  public FactoryBean<EntityManagerFactory> entityManagerFactory() {

    HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
    vendorAdapter.setGenerateDdl(true);

    LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
    factory.setJpaVendorAdapter(vendorAdapter);
    factory.setPackagesToScan("com.google.search");
    factory.setJpaProperties(hibernateProperties());
    factory.setDataSource(dataSource());

    return factory;
  }

  private Properties hibernateProperties() {
    Properties properties = new Properties();

    properties.put("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
    properties.put("hibernate.enable_lazy_load_no_trans", true); // BAD
    properties.put("hibernate.jdbc.time_zone", "UTC");
    properties.put("hibernate.hbm2ddl.auto", "update");
    properties.put("connection.autoReconnect", true);
    properties.put("connection.autoReconnectForPools", true);
    properties.put("connection.is-connection-validation-required", true);
    //    properties.put("hibernate.show_sql", "true");

    return properties;
  }

  @Bean
  public EntityManager entityManager(EntityManagerFactory entityManagerFactory) {
    return entityManagerFactory.createEntityManager();
  }

  @Bean(name = "dataSource", destroyMethod = "")
  public DataSource dataSource() {
    BasicDataSource basicDataSource = new BasicDataSource();

    basicDataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
    basicDataSource.setUrl("jdbc:mysql://" + dataSourceURL + ":3306/martm");
    basicDataSource.setUsername(username);
    basicDataSource.setPassword(password);
    //basicDataSource.setValidationQuery("SELECT 1");

    return basicDataSource;
  }

}
